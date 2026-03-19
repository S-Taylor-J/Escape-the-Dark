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
    window.location.href = "/game";
  });
  playerSelectBtn.addEventListener("click", () => {
    window.location.href = "/playerSelect";
  });
  settingBtn.addEventListener("click", () => {
    window.location.href = "/settings";
  });
  howToPlayBtn.addEventListener("click", () => {
    window.location.href = "/howToPlay";
  });
  creditBtn.addEventListener("click", () => {
    window.location.href = "/credit";
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
    window.location.href = "/";
  }, 5000);
}
