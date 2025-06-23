export class Potion {
  constructor() {
    this.potionDuration = 5000;
    this.activePotion = [];
  }
  potionEffect(name, player) {
    switch (name) {
      case "Essence-of-Life":
        if (player.health < player.maxHealth) {
          player.health += 1;
          return true;
        } else return false;
      case "Vial-of-Velocity":
        if (!this.activePotion.includes(name)) {
          let originalSpeed = player.speed;
          player.speed *= 2;
          this.activePotion.push(name);
          setTimeout(() => {
            player.speed = originalSpeed;
            this.potionIndex(name);
          }, this.potionDuration);
          return true;
        } else return false;
      case "Luminous-Draught":
        if (!this.activePotion.includes(name)) {
          let originalLightLevel = player.lightLevel;
          this.activePotion.push(name);
          player.lightLevel *= 0;
          setTimeout(() => {
            player.lightLevel = originalLightLevel;
            this.potionIndex(name);
          }, this.potionDuration);
          return true;
        } else return false;
      case "Tonic-of-Time":
        if (!this.activePotion.includes(name)) {
          this.potionDuration += 1000;
          return true;
        } else return false;
    }
  }

  potionIndex(name) {
    let index = this.activePotion.indexOf(name);
    if (index > -1) {
      this.activePotion.splice(index, 1);
    }
  }
}
