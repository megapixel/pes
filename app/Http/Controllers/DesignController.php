<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Design;
use App\Document;
require_once(app_path() . "/helper.php");

class DesignController extends Controller
{
  public function all(Request $request) {
    $designs = Design::select('id', 'name', 'description', 'type_id')->get();
    return [
      'code' => 0,
      'items' => $designs
    ];
  }
  
  public function callDocs(Request $request) {
    $designs = Documents::select('id', 'name', 'description', 'type_id')->get();
    return [
      'code' => 0,
      'items' => $documents
    ];
  }
  

  public function uploadFile(Request $request) {
    $tmp_name = $_FILES['import']['tmp_name'];
    $now = time();
    $origin = $now . '_' . $_FILES['import']['name'];
    $path = public_path() . '/upload/';
    $name =  $path . $origin;
    if(move_uploaded_file($tmp_name, $name)) {
      $data = readWordFile($name);
      if ($data == -2) {
        return [
          'code' => -2,
          'message' => "Cannot import file doc"
        ];
      }
      return [
        'code' => 0,
        'data' => $data
      ];
    }
    return [
      'code' => -1,
      'message' => 'error'
    ];
  }

  public function downloadFile(Request $request) {
    $fileId = $request->fileId;
    $oAuthToken = $request->oAuthToken;
    $now = time();
    $path = public_path() . '/upload/';

    $getUrl = 'https://www.googleapis.com/drive/v3/files/' . $fileId . '?alt=media';
    $authHeader = 'Authorization: Bearer ' . $oAuthToken ;
    $outputFilePath = $path . $now .'.docx';
    $fp = fopen($outputFilePath, 'w');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $getUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [$authHeader]);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION , true);
    curl_setopt($ch, CURLOPT_TIMEOUT , 30000);
    curl_setopt($ch, CURLOPT_FILE , $fp);
    $data = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    $phpWord = \PhpOffice\PhpWord\IOFactory::load($outputFilePath);
    $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'HTML');
    $html = $path . $now . '.html';
    $objWriter->save($html);
    $data = file_get_contents($html);
    return [
      'code' => 0,
      'data' => $data
    ];
  }
}
