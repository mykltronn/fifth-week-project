var shadowNum = document.getElementById('magical-secret-hidden-counter');
var shadowBox = document.getElementById('main-box');

if(shadowNum.textContent == 8){
  shadowBox.className = "main-box-8";
}
else if (shadowNum.textContent == 7) {
  shadowBox.className = "main-box-7";
}
else if (shadowNum.textContent == 6) {
  shadowBox.className = "main-box-6";
}
else if (shadowNum.textContent == 5) {
  shadowBox.className = "main-box-5";
}
else if (shadowNum.textContent == 4) {
  shadowBox.className = "main-box-4";
}
else if (shadowNum.textContent == 3) {
  shadowBox.className = "main-box-3";
}
else if (shadowNum.textContent == 2) {
  shadowBox.className = "main-box-2";
}
else if (shadowNum.textContent == 1) {
  shadowBox.className = "main-box-1";
}
else if (shadowNum.textContent === 0) {
  shadowBox.className = "main-box-0";
}
