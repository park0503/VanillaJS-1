const body = document.querySelector("body");
const IMG_AMOUNT = 14;

function getRandomNum() {
  const random = Math.ceil(Math.random() * IMG_AMOUNT);
  return random;
}

function paintImage() {
  const num = getRandomNum();
  const img = new Image();
  img.src = `images/${num}.jpg`;
  img.classList.add("bgimg");
  body.appendChild(img);
}

paintImage();
