function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}
const body = document.querySelector("body");
const scoreCounter = document.createElement("h1");
let score = 0;
body.style.backgroundColor = "black";
body.style.color = "white";
scoreCounter.textContent = `Score: ${score}`;
body.appendChild(scoreCounter);

const init = () => {
  const footStep = new Audio("./audio/smw_footstep.wav");
  const coinSound = new Audio("./audio/smw_coin.wav");
  moveCoin();
  const cunt = document.querySelector("img");
  console.dir(cunt);

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "Down") {
      footStep.play();
      moveVertical(avatar, 50);
    }
    if (e.key === "ArrowUp" || e.key === "Up") {
      footStep.play();
      moveVertical(avatar, -50);
    }
    if (e.key === "ArrowRight" || e.key === "Right") {
      footStep.play();
      avatar.style.transform = "scaleX(1)";
      moveHorizontal(avatar, 50);
    }
    if (e.key === "ArrowLeft" || e.key === "Left") {
      footStep.play();
      avatar.style.transform = "scaleX(-1)";
      moveHorizontal(avatar, -50);
    }

    if (isTouching(avatar, coin)) {
      moveCoin();
      coinSound.play();

      ++score;
      scoreCounter.textContent = `Score: ${score}`;
    }
  });
};

const moveVertical = (element, amount) => {
  const currTop = extractPos(element.style.top);
  const currBot = extractPos(element.style.bottom);
  if (
    (currTop >= innerHeight && amount > 0) ||
    (currBot >= innerHeight && amount > 0)
  ) {
    return;
  } else if ((currTop <= 0 && amount < 0) || (currBot <= 0 && amount < 0)) {
    return;
  } else {
    element.style.top = `${currTop + amount}px`;
    element.style.bottom = `${currBot + amount}px`;
  }
};

const moveHorizontal = (element, amount) => {
  const currLeft = extractPos(element.style.left);
  if (currLeft >= innerWidth && amount > 0) {
    return;
  } else if (currLeft <= 0 && amount < 0) {
    return;
  } else {
    element.style.left = `${currLeft + amount}px`;
  }
};
// const moveHorizontal = (element, amount, winWidth, offset) => {
//   const currLeft = parseInt(element.style.left) || 100
//   if(currLeft + amount < winWidth - offset && currLeft + amount >= 0 ){
//       element.style.left = `${currLeft + amount}px`;
//   }
// };

const extractPos = (position) => {
  if (!position) return 100;
  // -1 0
  return parseInt(position.slice(0, -2));
};

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

init();
