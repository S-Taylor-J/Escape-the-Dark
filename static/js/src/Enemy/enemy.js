import { animation } from "../helpers.js";

export class enemy {
  constructor(posX, posY, options = {}) {
    this.posX = posX;
    this.posY = posY;
    this.width = 16;
    this.height = 16;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0.5;
    this.scale = 0.7;
    this.frameX = 0;
    this.frameY = 0;
    this.hitBoxX = 10;
    this.hitBoxY = 0;

    this.patrolDirection = 1;
    this.chasing = false;
    this.sprite = options.sprite || null;
  }
  draw(context) {
    if (this.sprite) {
      context.drawImage(
        this.sprite,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.posX,
        this.posY,
        this.width * this.scale,
        this.height * this.scale
      );
    }
  }

  patrol() {
    this.posX += this.speed * this.patrolDirection;
    if (this.patrolDirection === 1) {
      this.frameX = 1;
    } else {
      this.frameX = 2;
    }
    animation(this, 4);
  }

  get gridPosition() {
    return {
      x: Math.floor(this.posX / 16),
      y: Math.floor(this.posY / 16),
    };
  }
}
