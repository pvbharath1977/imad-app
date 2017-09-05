console.log('Loaded!');
//var txtElement = document.getElementById("main_text");
//txtElement.innerHTML = "This is nice";

var imgElement = document.getElementById("madi");

var marginleft = 0;
function MoveRight() {
  marginleft = marginleft +2;
  imgElement.style.marginLeft = marginleft + "px";
}

var button = document.getElementbyId("counter");
var counter = 0;
button.onclick = function () {
    counter = counter + 1;
    var span = document.getElementById("count");
    span.innerHTML = counter.toString();
};

imgElement.onclick = function () {
//    imgElement.style.marginLeft = "200px";    
    var nInterval = setInterval(MoveRight,50);
};
