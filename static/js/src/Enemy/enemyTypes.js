import { enemy } from "./enemy.js";
import { animation, distance2Obj } from "../helpers.js";
import { assets } from "../Resources/resources.js";

export class chasingEnemy extends enemy {
  constructor(posX, posY) {
    super(posX, posY, {
      sprite: assets.enemySprites.slime,
    });
    this.chaseRange = 5 * 16;
    this.isChasing = false;
  }

  update(player) {
    let distance = distance2Obj(player, this);

    if (distance < this.chaseRange) {
      this.isChasing = true;
      this.chasePlayer(player);
    } else {
      this.isChasing = false;
      this.patrol();
    }
  }

  chasePlayer(player) {
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
}

export class patrollingEnemy extends enemy {
  constructor(posX, posY) {
    super(posX, posY, {
      sprite: assets.enemySprites.slime,
    });
  }

  update(player) {
    this.patrol();
  }
}
