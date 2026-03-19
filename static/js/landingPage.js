document.addEventListener("DOMContentLoaded", init, false);

function init() {
  window.addEventListener("keydown", (key) => {
    if (key.key === " ") {
      window.location.href = "/homepage";
    }
  });
}
