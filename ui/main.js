console.log('Loaded!');
var txtElement = document.getElementById("main_text");
txtElement.innerHTML = "This is nice";

var imgElement = document.getElementById("madi");

var marginleft = 0;
function MoveRight() {
  marginleft = marginleft +5;
  imgElement.style.marginLeft = marginleft + "px";
}


imgElement.onclick = function () {
//    imgElement.style.marginLeft = "200px";    
    var nInterval = setInterval(MoveRight,50);
};
