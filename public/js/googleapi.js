// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = 'AIzaSyAO2zzNCGnhRhdoF-qQWD16yMA69Gm4x2U';

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
var clientId = "214238441663-lpbeke7u7860dj8legsrljfpcaslcgru.apps.googleusercontent.com"

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
var appId = "formbuilder-174009";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive'];

var pickerApiLoaded = false;
var oauthToken;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: clientId,
    scope: SCOPES
  });
}

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': onPickerApiLoad});
}

function onAuthApiLoad() {
  window.gapi.auth.authorize({
    'client_id': clientId,
    'scope': scope,
    'immediate': false
    },
    handleAuthResult
  );
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var view = new google.picker.View(google.picker.ViewId.DOCUMENTS);
    var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
     picker.setVisible(true);
  }
}

// A simple callback implementation.
function pickerCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    var mimeType = data.docs[0].mimeType;
    var fileId = data.docs[0].id;
    if (mimeType == 'application/vnd.google-apps.document') {
      var fileId = data.docs[0].id;
      getFile(fileId);
    } else downloadFile(fileId);
  }
}

function getFile(id) {
  gapi.client.drive.files.export({
    fileId: id,
    mimeType: 'text/html'
  }).then(function(response) {
    setEditorContent('table-editor', response.body);
  });
}

function downloadFile(id) {
  $.ajax({
    type: 'POST',
    url: '/api/googledrive/download',
    data: {
      fileId: id,
      oAuthToken: oauthToken
    },
    success: function(json) {
      if (!json.code) setEditorContent('table-editor', json.data);
      else swal("Error", '',"error");
    }
  })
}
