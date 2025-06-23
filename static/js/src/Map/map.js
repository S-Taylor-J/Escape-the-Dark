import { gameOver } from "../UI/UIHelpers.js";

export class map {
  constructor(levels) {
    this.levels = levels;
    this.currentLevel = 0;
    this.tileSet = new Image();
    this.tilesPerRow = 10;
    this.tilePerCol = 10;
    this.tileSize = 16;
    this.mapMatrix = this.listToMatrix(this.levels[this.currentLevel], 60, 60);
    this.exit = [];
    this.levelTransitioning = false;
    this.levelCompleted = false;
    this.collisionTiles;
  }

  nextLevel(raf) {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel += 1;
    } else {
      gameOver(raf);
    }
    this.mapMatrix = this.listToMatrix(this.levels[this.currentLevel], 60, 60);

    this.exit = [];
    this.exit = this.mapInfo();
    this.levelTransitioning = true;
    setTimeout(() => {
      this.levelTransitioning = false;
    }, 1000);
  }

  listToMatrix(list, rows, cols) {
    if (list.length < rows * cols) {
    }
    let matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix.push(list.slice(i * cols, (i + 1) * cols).map((num) => num - 1));
    }
    return matrix;
  }

  drawMap(context, tileSet) {
    let level = this.levels[this.currentLevel];
    let map = this.listToMatrix(level, 60, 60);
    this.mapMatrix = map;
    let rows = map.length;
    let cols = map[0].length;

    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        let tile = map[r][c];
        if (tile >= 0) {
          let tileRow = Math.floor(tile / this.tilesPerRow);
          let tileCol = Math.floor(tile % this.tilesPerRow);
          context.drawImage(
            tileSet,
            tileCol * this.tileSize,
            tileRow * this.tileSize,
            this.tileSize,
            this.tileSize,
            c * this.tileSize,
            r * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }
  mapInfo() {
    for (let row = 0; row < this.mapMatrix.length; row++) {
      for (let col = 0; col < this.mapMatrix[row].length; col++) {
        if (
          this.mapMatrix[row][col] === 36 ||
          this.mapMatrix[row][col] === 37
        ) {
          // 35/36
          let posX = col;
          let posY = row;

          this.exit.push({ x: posX, y: posY });
        }
      }
    }
    return this.exit;
  }
}

export function mapCollision(obj, level, posX, posY, tileSize) {
  let collisionTiles = [
    0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 42, 44, 45, 50, 53, 54, 55, 51,
    40, 41, 52, 43, 69, 79,
  ];

  //Topleft corner
  let topLX = Math.floor(posX / tileSize);
  let topLY = Math.floor(posY / tileSize);

  //Top right corner
  let topRX = Math.floor((posX + obj.hitBoxX) / tileSize);
  //Bottom left corner
  let bottomLY = Math.floor((posY + obj.hitBoxY) / tileSize);
  let bottomLX = Math.floor(posX / tileSize);

  //Bottom right corner
  let bottomRX = Math.floor((posX + obj.hitBoxX) / tileSize);
  let bottomRY = Math.floor((posY + obj.hitBoxY) / tileSize);

  let topLeftTile = level[topLY][topLX];
  let bottomRightTile = level[bottomRY][bottomRX];
  let topRightTile = level[topLY][topRX];
  let bottomLeftTile = level[bottomLY][bottomLX];
  if (
    collisionTiles.includes(topLeftTile) ||
    collisionTiles.includes(bottomRightTile) ||
    collisionTiles.includes(topRightTile) ||
    collisionTiles.includes(bottomLeftTile)
  ) {
    return true;
  }
  return false;
}
