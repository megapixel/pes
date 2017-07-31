<?php

define('ONLINE_CONVERT_KEY', env("ONLINE_CONVERT_KEY", ""));

function readWordFile($source) {
  $name = time();
  if (strpos(strtolower($source), '.docx') !== FALSE) {
    $phpWord = \PhpOffice\PhpWord\IOFactory::load($source);
    $xmlWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'HTML');
    $path = public_path() . '/upload/';
    $xmlWriter->save($path . "{$name}.html");
    $data = file_get_contents($path . "{$name}.html");
    return $data;
  } else {
    if (ONLINE_CONVERT_KEY == '') return -2;
    $filename = explode("/", $source);
    $filename = $filename[count($filename) - 1];
    $data = convertOnline($filename);
    return $data;
  }
}


function convertOnline($filename) {
  $endpoint = 'http://api2.online-convert.com/jobs';
  $apikey = ONLINE_CONVERT_KEY;
  $debug = TRUE;
  $protocol = "http";
  if ( isset( $_SERVER["HTTPS"] ) && strtolower( $_SERVER["HTTPS"] ) == "on" ) {
    $protocol = "https";
  }
  $url = $protocol . "://" . $_SERVER['SERVER_NAME'] . '/upload/' . $filename;

  $json_resquest = '{
    "input": [{
      "type": "remote",
      "source": "'.$url.'"
     }],
    "conversion": [{
      "target": "html"
     }]
  }';

  $ch = curl_init($endpoint);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $json_resquest);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'X-Oc-Api-Key: '.$apikey,
    'Content-Type: application/json',
    'cache-control: no-cache'
  ));

  $response = curl_exec($ch);
  $info = curl_getinfo($ch);
  $error =  curl_error($ch);
  curl_close($ch);
  $response = json_decode($response, true);
  if (isset($response['message']) && $response['message'] == 'The limit for daily conversions has been reached') return -2;
  $id = $response['id'];
  $token = $response['token'];
  $count = 0;
  $uri = '';
  while (1) {
    if ($count == 5) break;
    sleep(2);
    $uri = download($id, $token);
    if ($uri) break;
    $count++;
  }

  if ($count == 5) return -2;

  $path = public_path() . '/upload/';
  $name = time();
  copy($uri, $path . $name.'.html');
  $data = file_get_contents($path . $name.'.html');
  return $data;
}

function download($id, $token) {
  $endpoint = 'http://api2.online-convert.com/jobs/' . $id;
  $ch = curl_init($endpoint);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'X-Oc-Token: '. $token
  ));

  $response = curl_exec($ch);
  curl_close($ch);
  $data = json_decode($response, true);
  if($data['status']['code'] == 'completed') {
    $uri = $data["output"][0]["uri"];
    return $uri;
  }
  return 0;
}
