<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Document;
require_once(app_path() . "/helper.php");

class DocumentController extends Controller
{
 
  
  public function callDocs(Request $request) {
    $documents = Document::select('id', 'name', 'description', 'group_id')->get();
    return [
      'code' => 0,
      'items' => $documents
    ];
  }
  




}
