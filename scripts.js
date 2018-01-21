function upload() {
  document.getElementById('myFile').click();
}

function uploadFile() {
  //console.log("in this function");
  // where we find the file handle
  var selectedFile = document.getElementById('myFile').files[0];
  console.log(selectedFile.name);
}
