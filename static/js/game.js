import { player } from "./src/Player/player.js";
import { Hero } from "./src/Player/hero.js";
import { map } from "./src/Map/map.js";
import { camera } from "./src/Map/camera.js";
import {
  drawDarkness,
  animation,
  calculateReward,
  toggleMenuScreen,
} from "./src/helpers.js";
import { Trap } from "./src/Map/traps.js";
import { enemy } from "./src/Enemy/enemy.js";
import { Chest } from "./src/Map/chest.js";
import { inventory } from "./src/Player/inventory.js";
import {
  updateInventory,
  UIScreenShake,
  createHealthBar,
  gameOver,
} from "./src/UI/UIHelpers.js";
import { level1, level2 } from "./src/Map/levels.js";
import { bossEnemy } from "./src/Enemy/bossEnemy.js";
import { shop } from "./src/Player/shop.js";
import { Timer } from "./src/UI/timer.js";
import { selectedHero } from "./playerSelect.js";
import { assets } from "./src/Resources/resources.js";
import { mapCollision } from "./src/Map/map.js";
import { Cheats } from "./src/cheats.js";
import { spawnEnemies } from "./src/Enemy/enemySpawning.js";

//Canvas properties
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let raf;

//Input properties
let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;
let lastDirection = [];
//Initialize images

//Map properties
let gameMaps = new map([level1, level2]);
let heroSprite = new Image();
let tileSize = 16;

//Draw properties
let fpsInterval = 1000 / 60;
let now;
let then = Date.now();

//Initialize class instance
let hero = selectHero(selectedHero, 16, 16, gameMaps.mapMatrix, tileSize);
let playerInventory = new inventory(hero);
let tavern = new shop(hero, playerInventory);
let chests = Chest.createChests(gameMaps.mapMatrix, tileSize);
let traps = Trap.createTraps(gameMaps.mapMatrix, tileSize);
let enemies = spawnEnemies(gameMaps.mapMatrix, tileSize);
let boss = new bossEnemy(100, 100, gameMaps.mapMatrix, tileSize);
let timer = new Timer();
let cheats = new Cheats(hero, playerInventory);

let isGameOver = false;

document.addEventListener("DOMContentLoaded", init, false);
function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  //Add loot to chests
  treasureLogic();

  //UI elements
  createHealthBar(hero.maxHealth, assets.heartImage);
  gameMaps.mapInfo();
  timer.start();
  gameLoop();
}

function gameLoop() {
  raf = window.requestAnimationFrame(gameLoop);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed < fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);
  UI();
  playerLogic();
  trapLogic();
  enemyLogic();
  bossLogic();
  context.save();
  camera(
    canvas,
    context,
    hero.posX,
    hero.posY,
    hero.width,
    hero.height,
    tileSize,
    gameMaps.mapMatrix
  );

  draw();
  context.restore();
}

function playerLogic() {
  if (hero.health <= 0 && !isGameOver) {
    isGameOver = true;
    gameOver(raf);
    return;
  }
  playerMove();
  if (
    (hero.gridPosition.x === gameMaps.exit[0].x &&
      hero.gridPosition.y === gameMaps.exit[0].y) ||
    (hero.gridPosition.x === gameMaps.exit[1].x &&
      hero.gridPosition.y === gameMaps.exit[1].y)
  ) {
    loadNextLevel();
  }
  chests.forEach((chest) => {
    if (
      hero.gridPosition.x === chest.posX / tileSize &&
      hero.gridPosition.y === chest.posY / tileSize &&
      !chest.isOpen
    ) {
      chest.openChest(playerInventory);
      tavern.updateShop();
    }
  });
  if (
    hero.gridPosition.x === boss.gridPosition.x &&
    hero.gridPosition.y === boss.gridPosition.y
  ) {
    hero.takeDamage(canvas);
    boss.resetLocation();
    boss.chasingPlayer = false;
    setTimeout(() => {
      boss.chasingPlayer = true;
    }, boss.coolDownTime);
  }
}

function enemyLogic() {
  enemies.forEach((enemy) => {
    if (enemy.update) {
      enemy.update(hero);
    }

    if (
      !mapCollision(
        enemy,
        gameMaps.mapMatrix,
        enemy.posX + enemy.speed,
        enemy.posY,
        tileSize
      )
    ) {
      enemy.patrol();
    } else {
      enemy.patrolDirection *= -1;
      enemy.patrol();
    }

    if (
      hero.gridPosition.x === enemy.gridPosition.x &&
      hero.gridPosition.y === enemy.gridPosition.y
    ) {
      if (!hero.invincible) {
        hero.takeDamage(canvas);
      }
    }
  });
}

function trapLogic() {
  traps.forEach((trap) => {
    let trapTileX = Math.floor(trap.posX / tileSize);
    let trapTileY = Math.floor(trap.posY / tileSize);
    trap.activateTrap();

    if (trap.activate) {
      if (
        hero.gridPosition.x === trapTileX &&
        hero.gridPosition.y === trapTileY
      ) {
        if (!hero.invincible) {
          hero.takeDamage(canvas);
        }
      }
    }
  });
}

function bossLogic() {
  boss.chasePlayer(hero);
  if (
    hero.gridPosition.x === boss.gridPosition.x &&
    hero.gridPosition.y === boss.gridPosition.y
  ) {
    if (!hero.invincible) {
      hero.takeDamage(canvas);
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameMaps.drawMap(context, assets.tileSet);
  chests.forEach((chest) => {
    chest.draw(context, assets.tileSet);
  });
  traps.forEach((trap) => trap.draw(context, assets.trapSprites));
  enemies.forEach((enemy) => enemy.draw(context));
  hero.draw(context, heroSprite);
  boss.draw(context, assets.enemySprites.skullHead);
  drawDarkness(context, canvas, hero.posX, hero.posY, hero.lightLevel);
}

function UI() {
  let healthImages = document.querySelectorAll(".health");
  healthImages.forEach((heart, index) => {
    if (index < hero.health) {
      heart.style.filter = "none";
    } else {
      heart.style.filter = "opacity(0.5)";
    }
  });
}

function selectHero(heroType, width, height, level, tileSize) {
  heroSprite = assets.heroSprites[heroType];
  return new Hero(heroType, width, height, level, tileSize);
}

function playerMove() {
  let nextX = hero.posX;
  let nextY = hero.posY;

  if (
    moveRight &&
    !mapCollision(hero, gameMaps.mapMatrix, nextX + hero.speed, nextY, tileSize)
  ) {
    nextX += hero.speed;
    hero.frameX = 3;
  }
  if (
    moveLeft &&
    !mapCollision(hero, gameMaps.mapMatrix, nextX - hero.speed, nextY, tileSize)
  ) {
    nextX -= hero.speed;
    hero.frameX = 2;
  }
  if (
    moveUp &&
    !mapCollision(hero, gameMaps.mapMatrix, nextX, nextY - hero.speed, tileSize)
  ) {
    nextY -= hero.speed;
    hero.frameX = 1;
  }
  if (
    moveDown &&
    !mapCollision(hero, gameMaps.mapMatrix, nextX, nextY + hero.speed, tileSize)
  ) {
    nextY += hero.speed;
    hero.frameX = 0;
  }

  if (moveLeft || moveRight || moveDown || moveUp) {
    animation(hero, 4);
  }
  if (!(moveLeft || moveRight || moveDown || moveUp)) {
    hero.frameX = 0;
    animation(hero, 1);
  }
  hero.posX = Math.floor(nextX);
  hero.posY = Math.floor(nextY);
}

function activate(event) {
  let key = event.key;
  let inventoryUI = document.getElementById("inventoryUI");
  let tavernUI = document.getElementById("tavernUI");
  let cheatsUI = document.getElementById("cheatsUI");
  let menus = {
    inventoryUI: inventoryUI,
    tavernUI: tavernUI,
    cheatsUI: cheatsUI,
  };
  key = key.toLowerCase();
  if (
    event.key === "arrowleft" ||
    event.key === "arrowright" ||
    event.key === "arrowup" ||
    event.key === "arrowdown" ||
    event.key === "w" ||
    event.key === "s" ||
    event.key === "a" ||
    event.key === "d" ||
    event.key === "shift" ||
    event.key === "t" ||
    event.key === "e" ||
    event.key === "c" ||
    event.key === "q"
  ) {
    event.preventDefault();
    if (lastDirection[0] !== key) {
      lastDirection[0] = key;
    }
  }
  if (key === "arrowleft" || key === "a") {
    moveLeft = true;
  } else if (key === "arrowright" || key === "d") {
    moveRight = true;
  } else if (key === "arrowup" || key === "w") {
    moveUp = true;
  } else if (key === "arrowdown" || key === "s") {
    moveDown = true;
  }
  if (key === "e" && !hero.coolDown) {
    hero.specialAbility();
  }
  if (key === "q") {
    hero.stunBoss(boss);
  }
  if (key === "shift") {
    toggleMenuScreen(menus, key);
    playerInventory.updateInventory(playerInventory);
  }
  if (key === "t") {
    toggleMenuScreen(menus, key);
    tavern.updateShop(playerInventory);
  }
  if (key === "c") {
    toggleMenuScreen(menus, key);
    cheats.displayCheatMenu();
  }
}

function deactivate(event) {
  let key = event.key;
  key = key.toLowerCase();
  if (key === "arrowleft" || key === "a") {
    moveLeft = false;
    player.xChange = 0;
  } else if (key === "arrowright" || key === "d") {
    moveRight = false;
    player.xChange = 0;
  } else if (key === "arrowup" || key === "w") {
    moveUp = false;
    player.yChange = 0;
  } else if (key === "arrowdown" || key === "s") {
    moveDown = false;
    player.yChange = 0;
  }
  if (key === "e") {
  }
}

function treasureLogic() {
  chests.forEach((chest) => {
    if (chest.loot.length === 0) {
      chest.addLoot();
    }
  });
}

function loadNextLevel() {
  let reward = calculateReward(timer.getTime());
  playerInventory.addItem("Gold-Coin", reward);
  timer.restartTimer();
  gameMaps.nextLevel(raf);
  hero.spawnLocation(gameMaps.mapMatrix);
  traps = Trap.createTraps(gameMaps.mapMatrix, tileSize);
  enemies = spawnEnemies(gameMaps.mapMatrix, tileSize);
  chests = Chest.createChests(gameMaps.mapMatrix, tileSize);
  boss = new bossEnemy(100, 100, gameMaps.mapMatrix, tileSize);
  treasureLogic();
}
