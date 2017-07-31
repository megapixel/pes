<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Cache-control" content="no-cache">
    <title>Form Builder</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="vendor/bootstrap/js/bootstrap.min.js" ></script>
    <script type="text/javascript" src="js/sweetalert.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="vendor/ckeditor/ckeditor.js"></script>
  	<script src="js/config-editor.js"></script>

  	<link rel="stylesheet" href="css/toolbarconfigurator/lib/codemirror/neo.css">
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/jquery-ui.min.css" />
    <link rel="stylesheet" href="css/sweetalert.css">
    <link rel="stylesheet" href="css/fonts.css" />
    <link rel="stylesheet" href="css/custom.css?v=11" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.14/beautify-html.js"></script>
  </head>
  <body class="step-1">
    <div class="container">
      <div class="clearfix">
        <h2 class="col-sm-6">Form Builder Demo</h2>
        <div class="text-center col-sm-6 header-top">
          <button type="button" name="button" class="btn-nav btn btn-success" id="btn-prev">
            <i class="glyphicon glyphicon-backward"></i>
            Prev
          </button>
          <button type="button" name="button" class="btn-nav btn btn-primary" style="margin-left:5px" id="btn-next">
            Next
            <i class="glyphicon glyphicon-forward"></i>
          </button>
          <button type="button" name="button" class="btn-nav btn btn-primary" style="margin-left:5px" id="btn-save">
            Save
          </button>
        </div>
      </div>
      <div class="step-container">
        <div class="step active" id="step-1">
          <button id="import-google-drive" class="btn btn-default">Import file from google drive</button>
          <button id="import-computer" class="btn btn-default">
            <img src="/image/loading.gif" alt="loading" style="max-width: 18px;">
            Import file from computer</button>
          <form class="hidden">
            <input id="input-import-computer" type="file" name="import" accept=".doc, .docx">
          </form>
          <div class="editor-content hidden">
          </div>
          <br>
          <br>
          <div id="table-editor"></div>
        </div>

        <div class="step" id="step-2">
          <div class="row">
            <div class="col-xs-12 col-sm-9">
              <div class="playground"></div>
            </div>
            <div class="col-xs-12 col-sm-3">
              <div class="toolbar scroller" data-spy="affix" data-offset-top="205"></div>
            </div>
          </div>
        </div>

        <div class="step" id="step-3">
          <hr>
          <div class="row">
            <div class="col-xs-12">

              <div id="render-content-final">
              </div>

              <div id="render-content-temp" class="hidden">
              </div>
              <button class="btn btn-info pull-right" id="export">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin: 0;">
      <div class="col-xs-12">
        <div id="render-hidden"></div>
      </div>
    </div>

    <div id="modal-export" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-center">Export Result</h4>
          </div>
          <div class="modal-body">
            <textarea name="view-export" rows="25"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="file-temp hidden"></div>
    <script src="js/components.js" charset="utf-8"></script>
    <script src="js/googleapi.js"></script>
    <script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>
    <script src="js/custom.js" charset="utf-8"></script>
    <script type="text/javascript">
      initSample();
    </script>
  </body>
</html>
