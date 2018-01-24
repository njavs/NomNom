var tagReq = new XMLHttpRequest();
// var url = 'http://localhost:8080/HelloWorld';
// tagReq.open('GET', url);
//
// tagReq.onload = function() {
//   // the response, in case we want to look at it
//   console.log(tagReq.responseText);
// };
// tagReq.send();

var formData = new FormData();

function upload() {
  document.getElementById('myFile').click();
}

function uploadFile() {
  //console.log("in this function");
  // where we find the file handle
  formData.append('userfile', selectedFile);
  var url = 'http://localhost:8080/';
  // more or less a standard http request
  var oReq = new XMLHttpRequest();
  // POST requests contain data in the body
  // the "true" is the default for the third param, so
  // it is often omitted; it means do the upload
  // asynchornously, that is, using a callback instead
  // of blocking until the operation is completed.
  oReq.open('POST', url, true);
  //var fileName = selectedFile.name;
  //selectedFile.name = '';

  oReq.send(formData);

  oReq.onload = function() {
    var selectedFile = document.getElementById('myFile').files[0];
    console.log(selectedFile);
    var div = document.createElement('div');
    div.setAttribute('class', 'd221');
    var fC = document.createElement('div');
    fC.setAttribute('class', 'j1');
    var sC = document.createElement('div');
    sC.setAttribute('class', 'j2');

    fC.style.backgroundImage = 'url(' + selectedFile.name + ')';
    var para = document.createElement('p');
    para.innerHTML = 'Calories: 2200';
    sC.appendChild(para);
    div.appendChild(fC);
    div.appendChild(sC);
    var parent = document.getElementById('toAppend');
    console.log(parent);
    console.log(div);
    parent.appendChild(div);
  };
}
