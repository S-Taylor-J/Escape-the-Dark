import {
  abilityCoolDownUI,
  UIScreenShake,
  abilityActiveUI,
} from "../UI/UIHelpers.js";
import { distance2Obj } from "../helpers.js";
import { assets } from "../Resources/resources.js";
import { playAudio } from "../Audio/audio.js";

export class player {
  constructor(width, height, level, tileSize) {
    this.tileSize = tileSize;
    this.width = width;
    this.height = height;
    this.speed = 2;
    this.scale = 1;
    this.frameX = 0;
    this.frameY = 0;
    this.offSetX = -3;
    this.offSetY = -6;
    this.hitBoxX = 8;
    this.hitBoxY = 10;

    this.stunCoolDown = false;
    this.stunCoolDownTime = 5000;
    this.stunDistance = 32;

    // Player Audio
    this.stunSound = assets.audio.stunThrow;
    this.hurtSound = assets.audio.playerHurt;

    // Utility
    this.coolDown = false;
    this.invincible = false;
    this.invincibleTimer = 2000;
    this.timer = 0;

    this.abilityUIActive = false;

    // Set spawn location
    this.spawnLocation(level);
  }

  draw(context, sprite) {
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

  spawnLocation(level) {
    for (let row = 0; row < level.length; row++) {
      for (let col = 0; col < level[row].length; col++) {
        if (level[row][col] === 39) {
          // Spawn tile found
          this.posX = col * this.tileSize;
          this.posY = row * this.tileSize;
          return;
        }
      }
    }
    this.posX = 30;
    this.posY = 30;
  }

  abilityCoolDown(coolDownTime) {
    this.coolDown = true;
    setTimeout(() => {
      this.coolDown = false;
    }, coolDownTime);
  }

  takeDamage(canvas) {
    if (this.invincible) return;
    if (this.ability) return;
    this.invincible = true;
    this.health -= 1;
    playAudio(this.hurtSound, "Effects");
    UIScreenShake(canvas);
    setInterval(() => {
      this.invincible = false;
    }, this.invincibleTimer);
  }

  stunBoss(boss) {
    if (this.stunCoolDown) return;
    if (this.coolDown) return;
    abilityActiveUI();
    playAudio(this.stunSound, "Effects");
    this.stunCoolDown = true;
    let distance = distance2Obj(boss, this);
    this.abilityCoolDown(this.stunCoolDownTime);
    if (distance < this.stunDistance) {
      boss.stun();
    }
    setTimeout(() => {
      abilityCoolDownUI(this);
      this.stunCoolDown = false;
    }, 0);
  }

  get gridPosition() {
    return {
      x: Math.floor((this.posX + this.hitBoxX) / 16),
      y: Math.floor((this.posY + this.hitBoxY) / 16),
    };
  }
}
