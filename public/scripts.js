// var tagReq = new XMLHttpRequest();
// var url = 'http://localhost:8080/HelloWorld';
// tagReq.open('GET', url);
//
// tagReq.onload = function() {
//   // the response, in case we want to look at it
//   console.log(tagReq.responseText);
// };
// tagReq.send();
var totalCal = 0;
function upload() {
  document.getElementById('myFile').click();
}

function uploadFile() {
  //console.log("in this function");
  // where we find the file handle
  var formData = new FormData();
  var selectedFile = document.getElementById('myFile').files[0];
  console.log(selectedFile);
  formData.append('userfile', selectedFile);
  console.log(formData);
  var url = 'http://localhost:8080';
  // more or less a standard http request
  var oReq = new XMLHttpRequest();
  // POST requests contain data in the body
  // the "true" is the default for the third param, so
  // it is often omitted; it means do the upload
  // asynchornously, that is, using a callback instead
  // of blocking until the operation is completed.
  oReq.open('POST', url, true);

  oReq.onload = function() {
    // the response, in case we want to look at it
    console.log(oReq.responseText);

    var obj = oReq.responseText.split(',');
    console.log(obj);

    var tag = window.prompt(
      'Choose one of the following: ' + obj,
      'defaultText'
    );
    console.log(tag);

    // var newReq = new XMLHttpRequest();
    // url = 'http://localhost:8080/query?tag=' + tag;
    // newReq.open('GET', url);

    //  newReq.onload = function() {
    //var j2 = document.getElementByClassName('j2');

    var div = document.createElement('div');
    div.setAttribute('class', 'd221');
    var fC = document.createElement('div');
    fC.setAttribute('class', 'j1');
    var sC = document.createElement('div');
    sC.setAttribute('class', 'j2');

    $(sC); //.html('');
    $.ajax({
      type: 'GET',
      async: false,
      url:
        'https://api.nutritionix.com/v1_1/search/' +
        tag +
        '?' +
        'fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=edceffc2&appKey=e5d4895c25360a4d036656047659ef10',
      success: function(d) {
        getCals(d.hits[0]);
      }
    });

    var tCals;

    function getCals(item) {
      var x = item.fields;
      tCals = x.nf_calories;
      //need to erase old total cals
    }
    totalCal += tCals;
    totalCal.toFixed(0);
    console.log('Number of calories for ');
    console.log(tCals);
    var tC = document.getElementById('tCals');
    tC.innerHTML = 'Total Calories: ' + totalCal;

    fC.style.backgroundImage = 'url(' + selectedFile.name + ')';
    var para = document.createElement('p');
    para.innerHTML = 'Calories: ' + tCals;
    sC.appendChild(para);
    div.appendChild(fC);
    div.appendChild(sC);
    var parent = document.getElementById('toAppend');
    console.log(parent);
    console.log(div);
    parent.appendChild(div);
    //};
    //newReq.send();
  };
  oReq.send(formData);
}
