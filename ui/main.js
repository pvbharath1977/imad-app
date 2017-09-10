console.log('Loaded!');
//var txtElement = document.getElementById("main_text");
//txtElement.innerHTML = "This is nice";

/*
var imgElement = document.getElementById("madi");

var marginleft = 0;
function MoveRight() {
  marginleft = marginleft +2;
  imgElement.style.marginLeft = marginleft + "px";
}
*/


var button = document.getElementById('counter');
var counter = 0;
button.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };

    request.open('GET','http://pvbharath.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var strname = nameInput.value;
var submit = document.getElementByID('submit_btn');
submit.onclick = function () {
    var names = ['name1','name2','name3',strname];
    var list = '';
    for (i=0;i<names.length;i++) {
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};



imgElement.onclick = function () {
//    imgElement.style.marginLeft = "200px";    
    var nInterval = setInterval(MoveRight,50);
};
