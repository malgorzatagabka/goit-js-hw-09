const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let changeColorId = null;

startBtn.addEventListener("click", changeColorStart);
stopBtn.addEventListener("click", stopColorChange);


function changeColorStart() {
  changeColorId = setInterval(() => {
    document.body.style.background = getRandomHexColor()
  }, 1000);
  startBtn.setAttribute("disabled", true);
  stopBtn.disabled = false;
}

function stopColorChange() {
  clearInterval(changeColorId);
  stopBtn.setAttribute("disabled", true);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}