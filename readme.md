# Form Builder

## Main ideas
This form builder tool is a front-end tool for drap-n-drop form Builder
The only back-end feature is load design data from database

To implement it, we create a simple api (for ajax):

`GET /designs`
`GET /documents`

Example Response:

```json
{
  "code": 0,
  "items": [
    {
      "id": 1,
      "name": "Tank: TK-001:Instrumentation Make/ Manufacturer",
      "data": "GGGG",
      "attribute_id": 7
    },
    {
      "id": 2,
      "name": "CAV Valve: CV-192-1:34:Project Number",
      "data": "DFGH",
      "attribute_id": 2
    },
    {
      "id": 3,
      "name": "Non Return Valve: NRV-15-1:17:System Number",
      "data": "dsaf",
      "attribute_id": 4
    }
  ]
}
```

If the endpoint: `/designs` is not suitable for your existing project, please edit it in php code and update the constant in `custom.js` too:

```JavaScript
const DESIGN_API_ENPOINT = '/designs';
const DOCUMENT_API_ENPOINT = '/documents';
```

## Project Structure

### Files need to read:
+ app/Design.php
+ routes/web.php
+ resources/views/form-builder.blade.php

### Folders need to read:
+ public/css
+ public/js
+ public/vendor

Other files is default of basic Laravel project

## Import file from Google Drive
Using Google API

+ Create project in Google API (https://console.cloud.google.com/apis/library)
+ Create 2 credentials: API key & OAuth client ID
+ Update value of variable (developerKey, clientId, appId) in `googleapi.js`

## Import file from computer
+ Using php library: PHPOffice/PHPWord (https://github.com/PHPOffice/PHPWord)
+ PHPWord isn't support .doc format, we use API of http://www.online-convert.com/ to convert file to html.
+ To use API of Online Convert, you must create account and get API key, after that update constant ONLINE_CONVERT_KEY in `.env`

## Components
You can create and edit components in `components.js`

+ const MARKUPS: define component template when drag to table
+ const ICONS: icon classes
+ const DATA_ATTRIBUTES: attributes of components
+ const OPTION_MARKUPS: define modal template when edit component
+ const EDIT_CALLBACKS: update data component
