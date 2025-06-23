export function playAudio(name, volumeController) {
  let clone = name.cloneNode(true);
  clone.volume = localStorage.getItem(volumeController) / 100;
  clone.play();
}

export function getAudioBtn(name, sound, volumeController) {
  let audioBtn = document.querySelectorAll(`.${name}`);

  audioBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      playAudio(sound, volumeController);
    });
  });
}
