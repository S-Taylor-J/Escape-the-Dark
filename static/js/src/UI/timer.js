export class Timer {
  constructor() {
    this.seconds = 0;
    this.minutes = 0;
    this.timerElement = document.getElementById("timer");
  }

  start() {
    this.interval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }
  updateTime() {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
    let formattedTime = `${String(this.minutes).padStart(2, "0")}:${String(
      this.seconds
    ).padStart(2, "0")}`;
    this.timerElement.textContent = formattedTime;
  }
  stop() {
    clearInterval(this.interval);
  }

  restartTimer() {
    this.stop();
    this.seconds = 0;
    this.minutes = 0;
    this.start();
  }

  getTime() {
    return this.seconds / 60 + this.minutes;
  }
}
