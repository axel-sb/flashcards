// import data from "./flashcards.mjs";

/* let data = window.localStorage.getItem("data");
console.log('newObject: ', JSON.parse(data)); */

/* let data = JSON.parse(window.localStorage.getItem("data"));
console.log('retrieved: ', data)
console.log('retrieved 94: ', data[94]) */

import data from "./data.js";
console.log('data: ', data)

let frontWrapper = document.querySelector(".front-wrapper");
let backWrapper = document.querySelector(".back-wrapper");
let front = document.querySelector(".front");
let back = document.querySelector(".back");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let turnBtn = document.querySelector("#turn");
let gradeUp = document.querySelector(".grade-up");
let gradeDown = document.querySelector(".grade-down");
// let gradeBtns = document.querySelector(".grade-btns");
let gradeBadge = document.querySelector("#grade-badge");

let i = 0;

//  ↓ CREATE FUNCTION, USE IN EVENT LISTENER  ↓

let counter = i +  ' / ' + data.length
let counterBadge = document.querySelector('#counter-badge')
counterBadge.textContent = counter
// selecting obj. values from 'data', without keys
let words = Object.values(data[i]);
let wordId = words[0];
front.textContent = words[2];
back.textContent = words[1];
let grade = words[3];

//  ↑ CREATE FUNCTION, USE IN EVENT LISTENER  ↑

const label = "logs";
console.group(label);
console.log("value of i is:", i);
console.log("wordId: ", wordId);
console.log("data: ", data);
console.log("words: ", words);
console.log("grade: ", grade);
console.groupEnd(label);

frontWrapper.addEventListener("click", function () {
  frontWrapper.classList.add("hidden");
  backWrapper.classList.remove("hidden");
  gradeDown.classList.remove("hidden");
  gradeUp.classList.remove("hidden");
});
backWrapper.addEventListener("click", function () {
  frontWrapper.classList.remove("hidden");
  backWrapper.classList.add("hidden");
  gradeDown.classList.add("hidden");
  gradeUp.classList.add("hidden");
});

/* ....................-.previous & next buttons */

nextBtn.addEventListener("click", function () {
  i = i + 1;
  words = Object.values(data[i]);
  wordId = words[0];

  back.textContent = words[1];
  front.textContent = words[2];

  console.log(`new value of i is: ${i}`);
  console.log(`new value of wordId is: ${wordId}`);

  frontWrapper.classList.remove("hidden");
  backWrapper.classList.add("hidden");
  gradeDown.classList.add("hidden");
  gradeUp.classList.add("hidden");
});

prevBtn.addEventListener("click", function () {
  i = i - 1;
  words = Object.values(data[i]);
  wordId = words[0];

  back.textContent = words[1];
  front.textContent = words[2];

  console.log(`new value of i is: ${i}`);
  console.log(`new value of wordId is: ${wordId}`);

  frontWrapper.classList.remove("hidden");
  backWrapper.classList.add("hidden");
  gradeDown.classList.add("hidden");
  gradeUp.classList.add("hidden");
});

turnBtn.addEventListener("click", function () {
  if (frontWrapper.classList.length === 1) {
    frontWrapper.classList.add("hidden");
    backWrapper.classList.remove("hidden");
    gradeDown.classList.remove("hidden");
    gradeUp.classList.remove("hidden");
  } else {
    frontWrapper.classList.remove("hidden");
    backWrapper.classList.add("hidden");
    gradeDown.classList.add("hidden");
    gradeUp.classList.add("hidden");
  }
});

/* .....................green & red buttons */

gradeUp.addEventListener("click", function () {
  i = i + 1;
  words = Object.values(data[i]);
  wordId = words[0];
  console.log(`new value of i is: ${i}`);
  console.log(`new value of wordId is: ${wordId}`);

  backWrapper.classList.add("hidden");
  back.textContent = words[1];

  front.textContent = words[2];
  frontWrapper.classList.remove("hidden");

  gradeDown.classList.add("hidden");
  gradeUp.classList.add("hidden");

  // grade value
  let grade = data[i].grade += 1;
  console.log("index: ", data[i]);
  gradeBadge.textContent = `${data[i].grade}`;

  // C O N F E T T I
  // do this for n seconds
  var duration = 0.5 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    // launch a few confetti from the left edge
    confetti({
      particleCount: 4,
      angle: 70,
      spread: 35,
      origin: { x: 0.75 },
      scalar: 0.8,
      gravity: 1.5,
      ticks: 150,
      startVelocity: 50,
      decay: 1.7,
    });
    // and launch a few from the right edge
    confetti({
      particleCount: 6,
      angle: 90,
      spread: 75,
      origin: { x: 0.8, y: 1 },
      scalar: 0.6,
      gravity: 1.3,
      ticks: 100,
      startVelocity: 60,
    });

    // keep going until we are out of time
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});

gradeDown.addEventListener("click", function () {
  i = i + 1;
  words = Object.values(data[i]);
  wordId = words[0];
  console.log(`new value of i is: ${i}`);
  console.log(`new value of wordId is: ${wordId}`);

  backWrapper.classList.add("hidden");
  back.textContent = words[1];

  front.textContent = words[2];
  frontWrapper.classList.remove("hidden");

  gradeDown.classList.add("hidden");
  gradeUp.classList.add("hidden");

  // grade value
  data[i].grade -= 1;
  console.log("index: ", data[i]);
  gradeInfo.textContent = `${data[i].grade}`;
});

/* function populateStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}

populateStorage() */

/* let newObject = window.localStorage.getItem("data");
console.log('newObject: ', JSON.parse(newObject)); */

//  A U D I O   P L A Y E R

window.onload = () => {
  const audio = document.getElementById("my-audio");
  const play = document.getElementById("play");
  const pause = document.getElementById("pause");
  const loading = document.getElementById("loading");
  const bar = document.getElementById("bar");

  function displayControls() {
    loading.style.display = "none";
    play.style.display = "block";
  }

  // Check that the media is ready before displaying the controls
  if (audio.paused) {
    displayControls();
  } else {
    // not ready yet - wait for canplay event
    audio.addEventListener("canplay", () => {
      displayControls();
    });
  }

  play.addEventListener("click", () => {
    audio.play();
    play.style.display = "none";
    pause.style.display = "block";
  });

  pause.addEventListener("click", () => {
    audio.pause();
    pause.style.display = "none";
    play.style.display = "block";
  });

  // Display progress
  audio.addEventListener("timeupdate", () => {
    // Sets the percentage
    bar.style.width = `${Math.floor(
      (audio.currentTime / audio.duration) * 100
    )}%`;
  });
};

