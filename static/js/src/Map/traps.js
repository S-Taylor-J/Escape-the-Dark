export class Trap {
  constructor(posX, posY, width, height, type) {
    this.posX = posX;
    this.posY = posY;
    this.initialPosY = posY;

    this.width = width;
    this.height = height;
    this.activate = true;
    this.type = type ?? "fire";
    this.fireRange = 48;
    this.poisonRange = 48;

    this.timer = 0;
    this.radius = 16;

    this.frameX = 0;
    this.frameY = 0;
    this.frameSpeed = 10;
    this.frameCounter = 0;
    this.totalFrames = 4;
    this.scale = 1;
    this.offSetX = 0;
    this.offSetY = 0;
  }

  draw(context, trapSprites) {
    let sprite = null;

    switch (this.type) {
      case "fire":
        sprite = trapSprites.fire;
        this.width = 64;
        this.height = 64;
        this.scale = 0.7;
        this.offSetX = -15;
        this.offSetY = -10;
        if (this.activate) {
          if (this.posY - this.initialPosY <= this.fireRange) {
            this.posY += 1;
          } else {
            this.posY = this.initialPosY;
          }
        } else {
          this.posY = this.initialPosY;
        }
        this.time = 90;
        break;
      case "spike":
        sprite = trapSprites.spike;
        this.time = 200;
        this.totalFrames = 3;
        break;
      case "poison":
        sprite = trapSprites.spike;
        if (this.activate) {
          if (this.height <= this.poisonRange) {
            this.height += 1;
          }
        } else {
          this.height = 16;
        }
        this.time = 50;
        break;
    }

    if (this.activate && this.type === "spike") {
      this.frameCounter++;
      if (this.frameCounter >= this.frameSpeed) {
        this.frameCounter = 0;
        if (this.frameX < 2) {
          this.frameX += 1;
        } else {
          this.frameX = 2;
        }
      }
    } else if (!this.activate && this.type === "spike") {
      this.frameX = 0;
    }

    if (this.activate && this.type !== "spike") {
      this.frameCounter++;
      if (this.frameCounter >= this.frameSpeed) {
        this.frameCounter = 0;
        this.frameX = (this.frameX + 1) % this.totalFrames;
      }
    }

    if (this.activate) {
      context.drawImage(
        sprite,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.posX + this.offSetX,
        this.posY + this.offSetY,
        this.width * this.scale,
        this.height * this.scale
      );
    }
  }

  static createTraps(level, tileSize) {
    let traps = [];
    for (let row = 0; row < level.length; row++) {
      for (let col = 0; col < level[row].length; col++) {
        if (level[row][col] == 6) {
          traps.push(
            new Trap(
              col * tileSize,
              row * tileSize,
              tileSize,
              tileSize,
              "spike"
            )
          );
        } else if (level[row][col] == 69) {
          traps.push(
            new Trap(col * tileSize, row * tileSize, tileSize, tileSize, "fire")
          );
        }
      }
    }
    return traps;
  }

  activateTrap() {
    if (this.timer < this.time) {
      this.timer += 1;
    }
    if (this.timer === this.time) {
      this.activate = !this.activate;
      this.timer = 0;
    }
  }
}
