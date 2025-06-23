import { abilityActiveUI, abilityCoolDownUI } from "../UI/UIHelpers.js";
import { player } from "./player.js";

export let playerData = {
  knight: {
    maxHealth: 5,
    speed: 1.5,
    maxSpeed: 2,
    lightLevel: 30,
    maxLightLevel: 70,
    abilityDuration: 5000,
    maxAbilityDuration: 8000,
    coolDownTime: 10000,
    maxCoolDownTime: 6000,
    specialAbility(player) {
      if (!player.coolDown) {
        abilityActiveUI();
        this.ability = true;
        if (this.coolDownTime > 0) {
          player.abilityCoolDown(this.coolDownTime + this.abilityDuration);
        } else {
          player.abilityCoolDown(this.coolDownTime);
        }
        setTimeout(() => {
          this.ability = false;
          abilityCoolDownUI(player);
        }, this.abilityDuration);
      }
    },
  },
  ninja: {
    maxHealth: 4,
    speed: 2.5,
    maxSpeed: 4,
    lightLevel: 40,
    maxLightLevel: 80,
    abilityDuration: 1000,
    maxAbilityDuration: 1500,
    coolDownTime: 5000,
    maxCoolDownTime: 3000,
    specialAbility(player) {
      if (!player.coolDown) {
        abilityActiveUI();
        player.speed *= 2;
        if (this.coolDownTime > 0) {
          player.abilityCoolDown(this.coolDownTime + this.abilityDuration);
        } else {
          player.abilityCoolDown(this.coolDownTime);
        }
        setTimeout(() => {
          player.speed = playerData.ninja.speed;
          abilityCoolDownUI(player);
        }, this.abilityDuration);
      }
    },
  },
  monk: {
    maxHealth: 3,
    speed: 2,
    maxSpeed: 2.5,
    lightLevel: 50,
    maxLightLevel: 90,
    coolDownTime: 10000,
    maxCoolDownTime: 5000,
    specialAbility(player) {
      if (!player.coolDown) {
        abilityActiveUI();
        player.health = player.maxHealth;
        abilityCoolDownUI(player);
        player.abilityCoolDown(this.coolDownTime);
      }
    },
  },
  vampire: {
    maxHealth: 3,
    speed: 2,
    maxSpeed: 4,
    lightLevel: 70,
    maxLightLevel: 150,
    abilityDuration: 3000,
    maxAbilityDuration: 5000,
    coolDownTime: 5000,
    maxCoolDownTime: 3000,
    specialAbility(player) {
      if (!player.coolDown) {
        abilityActiveUI();
        let originalLight = player.lightLevel;
        player.lightLevel = 0;
        if (this.coolDownTime > 0) {
          player.abilityCoolDown(this.coolDownTime + this.abilityDuration);
        } else {
          player.abilityCoolDown(this.coolDownTime);
        }
        setTimeout(() => {
          player.lightLevel = originalLight;
          console.log("geting here");
          abilityCoolDownUI(player);
        }, this.abilityDuration);
      }
    },
  },
  // bear: {
  //   maxHealth: 10,
  //   speed: 6,
  //   maxSpeed: 4,
  //   lightLevel: 1000,
  //   maxLightLevel: 150,
  //   abilityDuration: 3000,
  //   maxAbilityDuration: 5000,
  //   coolDownTime: 5000,
  //   maxCoolDownTime: 3000,
  //   specialAbility(player) {},
  // },
};

export class Hero extends player {
  constructor(heroType, width, height, level, tileSize) {
    super(width, height, level, tileSize);

    let config = playerData[heroType];
    this.heroType = heroType;

    this.maxHealth = config.maxHealth;
    this.health = config.maxHealth;
    this.speed = config.speed;
    this.maxSpeed = config.maxSpeed;
    this.lightLevel = config.lightLevel;
    this.maxLightLevel = config.maxLightLevel;
    this.abilityDuration = config.abilityDuration || 0;
    this.maxAbilityDuration = config.maxAbilityDuration || 0;
    this.coolDownTime = config.coolDownTime;
    this.maxCoolDownTime = config.maxCoolDownTime;
    this._specialAbility = config.specialAbility;
  }

  specialAbility() {
    this._specialAbility(this);
  }
}
