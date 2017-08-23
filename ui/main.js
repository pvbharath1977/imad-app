console.log('Loaded!');
var txtElement = document.getElementById("main_text");
txtElement.innerHTML = "This is nice";

var imgElement = document.getElementById("madi");
imgElement.onclick = function () {
    imgElement.style.marginLeft = "200px";    
};
