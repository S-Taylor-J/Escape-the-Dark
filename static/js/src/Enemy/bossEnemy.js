import { animation } from "../helpers.js";

export class bossEnemy {
  constructor(posX, posY, level, tileSize) {
    this.posX = posX;
    this.posY = posY;
    this.level = level;
    this.tileSize = tileSize;
    this.width = 16;
    this.height = 16;
    this.speed = 0.5;

    this.frameX = 0;
    this.frameY = 0;
    this.hitBoxX = 1;
    this.hitBoxY = 5;

    this.offsetX = 8;
    this.offsetY = 16;

    this.coolDownTime = 5000;
    this.stunTime = 3000;
    this.flashInterval = 150;

    this.chasingPlayer = true;
  }
  draw(context, sprite) {
    if (sprite) {
      context.save();
      context.globalAlpha = this.opacity;
      context.drawImage(
        sprite,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
      context.restore();
    }
  }

  chasePlayer(player) {
    if (!this.chasingPlayer) return;
    let nextX = this.posX;
    let nextY = this.posY;

    if (this.posX + this.hitBoxX < player.posX) {
      nextX += this.speed;
      this.frameX = 3;
      animation(this, 4);
    }
    if (this.posX + this.hitBoxX > player.posX) {
      nextX -= this.speed;
      this.frameX = 2;
      animation(this, 4);
    }
    if (this.posY + this.hitBoxY < player.posY) {
      nextY += this.speed;
      this.frameX = 0;
      animation(this, 4);
    }
    if (this.posY + this.hitBoxY > player.posY) {
      nextY -= this.speed;
      this.frameX = 1;
      animation(this, 4);
    }
    this.posX = nextX;
    this.posY = nextY;
  }

  resetLocation() {
    this.posX = 0;
    this.posY = 0;
  }

  stun() {
    this.flashingEffect();
    this.chasingPlayer = false;
    setTimeout(() => {
      this.chasingPlayer = true;
    }, this.stunTime);
  }

  get gridPosition() {
    return {
      x: Math.floor((this.posX + this.offsetX) / 16),
      y: Math.floor((this.posY + this.offsetY) / 16),
    };
  }

  flashingEffect() {
    let flashIntervalId = setInterval(() => {
      this.opacity = this.opacity === 1 ? 0.8 : 1;
    }, this.flashInterval);

    setTimeout(() => {
      clearInterval(flashIntervalId);
      this.opacity = 1;
    }, this.stunTime);
  }
}
