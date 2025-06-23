//animation properties
let lastFrameTime = Date.now();
let frameSwitchDelay = 150;

// Draw darkness around the player
export function drawDarkness(ctx, canvas, playerX, playerY, radius) {
  // Fill the entire canvas with darkness
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.0)"; // Almost opaque black
  ctx.fillRect(0, 0, canvas.width, canvas.height * 5);
  ctx.globalCompositeOperation = "destination-atop";

  let gradient = ctx.createRadialGradient(
    playerX,
    playerY,
    radius * 0.5,
    playerX,
    playerY,
    radius
  );
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(playerX, playerY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

export function distance2Obj(obj1, obj2) {
  return Math.sqrt(
    Math.pow(obj1.posX - obj2.posX, 2) + Math.pow(obj1.posY - obj2.posY, 2)
  );
}

export function animation(obj, frameYLen) {
  let now = Date.now();
  let elapsed = now - lastFrameTime;

  if (elapsed >= frameSwitchDelay) {
    obj.frameY = (obj.frameY + 1) % frameYLen;
    lastFrameTime = now;
  }
}
export function calculateReward(timeTaken) {
  if (timeTaken < 400) return 100;
  else if (timeTaken < 600) return 50;
  else if (timeTaken < 800) return 25;
  else return 0;
}

export function healthUI() {
  let healthImages = document.querySelectorAll(".health");
  healthImages.forEach((heart, index) => {
    if (index < hero.health) {
      heart.style.filter = "none";
    } else {
      heart.style.filter = "grayscale(100%)";
    }
  });
}

export function toggleMenuScreen(menus, key) {
  if (key === "escape") {
    menus.forEach((menu) => {
      menu.style.display = "none";
    });
  }
  if (key === "shift") {
    menus.inventoryUI.style.display =
      menus.inventoryUI.style.display === "none" ? "flex" : "none";
    Object.keys(menus).forEach((key) => {
      if (key !== "inventoryUI") {
        menus[key].style.display = "none";
      }
    });
  }

  if (key === "t") {
    menus.tavernUI.style.display =
      menus.tavernUI.style.display === "none" ? "flex" : "none";
    Object.keys(menus).forEach((key) => {
      if (key !== "tavernUI") {
        menus[key].style.display = "none";
      }
    });
  }

  if (key === "c") {
    menus.cheatsUI.style.display =
      menus.cheatsUI.style.display === "none" ? "flex" : "none";
    Object.keys(menus).forEach((key) => {
      if (key !== "cheatsUI") {
        menus[key].style.display = "none";
      }
    });
  }
}
