import { toggleFullscreen, updateAudioVolume } from "../js/base.js";
document.addEventListener("DOMContentLoaded", init, false);

function init() {
  let audioBtn = document.getElementById("audioBtn");
  let graphicBtn = document.getElementById("graphicBtn");
  let screen = document.documentElement;

  audioBtn.addEventListener("click", () => toggleSettings("audio"), false);
  graphicBtn.addEventListener("click", () => toggleSettings("graphics"), false);
  sliderBar();
  graphicButtons();
  backButton();
}

function sliderBar() {
  let sliders = document.querySelectorAll(".slider");
  let values = document.querySelectorAll(".valueDisplay");

  sliders.forEach((slider, index) => {
    slider.value = localStorage.getItem(slider.classList[1]) || slider.value;
    values[index].textContent =
      localStorage.getItem(slider.classList[1]) || slider.value;
    slider.addEventListener("input", () => {
      values[index].textContent = slider.value;
      updateAudioVolume(slider.classList[1], slider.value);
      localStorage.setItem(slider.classList[1], slider.value);
    });
  });
}

function graphicButtons() {
  let fullScreenBtn = document.getElementById("fullscreenToggle");
  fullScreenBtn.addEventListener("click", () => {
    toggleFullscreen(fullScreenBtn);
  });
}

function toggleSettings(section) {
  let allSections = document.querySelectorAll(".settingSection");

  allSections.forEach((sec) => {
    if (sec.id !== section) {
      sec.classList.add("hidden");
    }
  });

  let settings = document.getElementById(section);

  if (settings.classList.contains("hidden")) {
    settings.classList.remove("hidden");
  } else {
    settings.classList.add("hidden");
  }
}
function backButton() {
  let backButton = document.getElementById("backBtn");

  backButton.addEventListener("click", () => {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/homepage";
  });
}
