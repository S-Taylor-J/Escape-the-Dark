import { assets } from "./src/Resources/resources.js";
import { getAudioBtn } from "./src/Audio/audio.js";

let btnSound = assets.audio.menuAudio;

document.addEventListener("DOMContentLoaded", init, false);
let inactivityTimer;

function init() {
  menuBtn();
  getAudioBtn("menuBtn", btnSound);
}

function menuBtn() {
  let playBtn = document.getElementById("playBtn");
  let playerSelectBtn = document.getElementById("playerSelectBtn");
  let howToPlayBtn = document.getElementById("howToPlayBtn");
  let settingBtn = document.getElementById("settingsBtn");
  let creditBtn = document.getElementById("creditBtn");
  playBtn.addEventListener("click", () => {
    window.location.href = "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/game";
  });
  playerSelectBtn.addEventListener("click", () => {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/playerSelect";
  });
  settingBtn.addEventListener("click", () => {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/settings";
  });
  howToPlayBtn.addEventListener("click", () => {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/howToPlay";
  });
  creditBtn.addEventListener("click", () => {
    window.location.href = "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/credit";
  });

  document.addEventListener("mousemove", resetInactivityTimer);
  document.addEventListener("keydown", resetInactivityTimer);
  document.addEventListener("click", resetInactivityTimer);
  document.addEventListener("scroll", resetInactivityTimer);
  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearInterval(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    window.location.href = "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/";
  }, 5000);
}
