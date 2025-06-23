document.addEventListener("DOMContentLoaded", init, false);

function init() {
  window.addEventListener("keydown", (key) => {
    if (key.key === " ") {
      window.location.href =
        "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/homepage";
    }
  });
}
