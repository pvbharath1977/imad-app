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


var button = document.getElementById("counter");
//var counter = 0;
button.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
    };

    request.open('GET','http://pvbharath.imad.hasura-app.io/',true);
    request.send(null);
};






imgElement.onclick = function () {
//    imgElement.style.marginLeft = "200px";    
    var nInterval = setInterval(MoveRight,50);
};
