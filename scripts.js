function upload() {
  document.getElementById('myFile').click();
}

function uploadFile() {
  //console.log("in this function");
  // where we find the file handle
    var selectedFile = document.getElementById('myFile').files[0];
    console.log(selectedFile);
    var div = document.createElement("div");
    div.setAttribute("class","d221");
    var fC = document.createElement("div");
    fC.setAttribute("class","j1");
    var sC = document.createElement("div");
    sC.setAttribute("class","j2");
    
    fC.style.backgroundImage = "url("+selectedFile.name+")";
    var para = document.createElement("p");
    para.innerHTML = "Calories: 2200";
    sC.appendChild(para);
    div.appendChild(fC);
    div.appendChild(sC);
    var parent = document.getElementById("toAppend");
    console.log(parent);
    console.log(div);
    parent.appendChild(div);
    
    

}
