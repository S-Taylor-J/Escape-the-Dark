import { assets, load_assets } from "./src/Resources/resources.js";
import { getAudioBtn, playAudio } from "./src/Audio/audio.js";

let BgMusic = document.getElementById("backgroundAudio");
let masterVolume = localStorage.getItem("Master") / 100;

let menuAudioSound = assets.audio.menuAudio;

document.addEventListener("DOMContentLoaded", function init() {
  load_assets();
  checkFullscreen();
  backgroundMusic();
  getAudioBtn("menuBtn", menuAudioSound, "Interface");
});

function backgroundMusic() {
  let BgMusic = document.getElementById("backgroundAudio");
  BgMusic.id = "bgMusic";
  BgMusic.src = assets.audio.bgMusic.src;
  BgMusic.loop = true;
  BgMusic.preload = "auto";
  BgMusic.volume = (localStorage.getItem("Music") / 100) * masterVolume;

  let savedTime = localStorage.getItem("audioTime");
  if (savedTime) {
    BgMusic.currentTime = parseFloat(savedTime);
  }

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("audioTime", BgMusic.currentTime);
  });

  window.addEventListener("load", () => {
    BgMusic.play();
  });

  document.addEventListener("keydown", () => {
    BgMusic.play();
  });
}

masterVolume = 1;
let musicVolume = 1;
let interfaceVolume = 1;
let EffectsVolume = 1;

export function updateAudioVolume(audio, volume) {
  let normalizedVolume = volume / 100;

  switch (audio) {
    case "Master":
      masterVolume = normalizedVolume;
      BgMusic.volume = musicVolume * masterVolume;
      break;

    case "Music":
      musicVolume = normalizedVolume;
      BgMusic.volume = musicVolume * masterVolume;
      break;

    case "Interface":
      interfaceVolume = normalizedVolume;
      break;
    case "Effects":
      EffectsVolume = normalizedVolume;
      break;
  }
}

export function toggleFullscreen(btn) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    btn.textContent = "Exit Fullscreen";
    localStorage.setItem("fullscreen", "true");
  } else {
    document.exitFullscreen();
    btn.textContent = "Enter Fullscreen";
    localStorage.setItem("fullscreen", "false");
  }
}

function checkFullscreen() {
  let btn = document.getElementById("fullscreenToggle");

  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      btn.textContent = "Exit Fullscreen";
      localStorage.setItem("fullscreen", "true");
    } else {
      btn.textContent = "Enter Fullscreen";
      localStorage.setItem("fullscreen", "false");
    }
  });

  if (
    localStorage.getItem("fullscreen") === "true" &&
    !document.fullscreenElement
  ) {
    let waitForInteraction = () => {
      document.documentElement.requestFullscreen().catch(() => {});
      document.removeEventListener("click", waitForInteraction);
      document.removeEventListener("keydown", waitForInteraction);
    };
    document.addEventListener("click", waitForInteraction);
    document.addEventListener("keydown", waitForInteraction);
  }
}
