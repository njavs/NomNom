const express = require('express');
var formidable = require('formidable');
const app = express();
const fs = require('fs');
const path = require('path');

// var request = require('request');
//
// requestObject = {
//   requests: [
//     {
//       image: { source: { imageUri: 'pizza.jpg' } },
//       features: [{ type: 'LABEL_DETECTION' }]
//     }
//   ]
// };
//
// url =
//   'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyALoG5kWvDYGbcHLjaRh0QP1IttGTSqUyg';
//
// function annotateImage() {
//   request(
//     {
//       // HTTP header stuff
//       url: url,
//       method: 'POST',
//       headers: { 'content-type': 'application/json' },
//       // stringifies object and puts into HTTP request body as JSON
//       json: requestObject
//     },
//     // callback function for API request
//     APIcallback
//   );
// }

app.use(express.static('public'));

// app.get('/query', function(request, response) {
//   console.log('query');
//   query = request.url.split('?')[1]; // get query string
//
//   if (query) {
//     answer(query, response);
//   } else {
//     sendCode(400, response, 'query not recognized');
//   }]
// });
//
// var cals = 0;
//
// function answer(query, response) {
//   var tag = query.split('=')[1];
//   //console.log(tag)
//
//
// }
//
const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

app.post('/', function(request, response) {
  var form = new formidable.IncomingForm();
  form.parse(request); // figures out what files are in form
  // callback for when a file begins to be processed
  form.on('fileBegin', function(name, file) {
    // put it in /public
    console.log('HEREEEEEEEEE');
    console.log(file);
    console.log('HEREEEEEEEEE');
    fileName = file.name;
    file.path = __dirname + '/images/' + file.name;
    console.log('uploading ', file.name, name);
  });

  form.on('end', function() {
    var request = require('request');
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    var str = '';
    var resp;

    var fileBase64 = fs.readFileSync(
      path.join('./images/', fileName),
      'base64'
    );
    //console.log('BASE 64 RESULT', fileBase64);
    requestObject = {
      requests: [
        {
          image: {
            content: fileBase64
            // source: {
            //   imageUri: 'http://localhost:8080/' + fileName
            // }
          },
          features: [{ type: 'LABEL_DETECTION' }]
        }
      ]
    };

    // URL containing the API key
    url =
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHWbIkadkeBr0kdZXNwntoVcXIrEG3uVI';

    function annotateImage() {
      request(
        {
          // HTTP header stuff
          url: url,
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization:
              'Bearer ya29.GltKBTSR_56w-hhtaga4lpvOKV-SFMxhX90A4AZLzlLeujLeDAArGlhuXW8Cy0mkpOjNkq_CMmn7jUjvKWFISMbdcTk0R2X6pj068k4IzHwcPPFW2q-h_l4X3nbQ'
          },
          // stringifies object and puts into HTTP request body as JSON
          json: requestObject
        },
        // callback function for API request
        APIcallback
      );
    }
    // live callback function
    function APIcallback(err, APIresponse, body) {
      if (err || APIresponse.statusCode != 200) {
        console.log('Got API error');
      } else {
        APIresponseJSON = body.responses[0];
        console.log(APIresponseJSON);
        resp = JSON.stringify(APIresponseJSON);
        for (var i = 0; i < APIresponseJSON.labelAnnotations.length; i++) {
          str = str + ',' + APIresponseJSON.labelAnnotations[i].description;
        }
        console.log(str);
        sendCode(201, response, str); // respond to browser
      }

      function errorCallback(err) {
        if (err) {
          console.log('error: ', err, '\n');
        }
      }
    }

    annotateImage();
    console.log('success');
  });
});

function sendCode(code, response, message) {
  response.status(code);
  response.send(message);
}
