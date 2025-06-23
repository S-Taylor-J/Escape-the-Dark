import { abilityActiveUI, abilityCoolDownUI } from "./UI/UIHelpers.js";

export class Cheats {
  constructor(player, playerInventory) {
    this.player = player;
    this.playerInventory = playerInventory;

    this.originalGold = 0;
    this.originalSpeed = player.speed;
    this.originalAbilityDuration = player.coolDownTime;
    this.originalStunDuration = player.stunCoolDownTime;
    this.originalLightLevel = player.lightLevel;

    this.moneyBtn = false;
    this.invincibilityBtn = false;
    this.abilityBtn = false;
    this.speedBtn = false;
    this.lightBtn = false;
  }
  displayCheatMenu() {
    let cheatMenu = document.getElementById("cheatsUI");
    cheatMenu.innerHTML = "";

    let cheats = [
      { id: "moneyBtn", text: "Money", toggle: this.toggleMoney.bind(this) },
      {
        id: "invincibilityBtn",
        text: "Invincibility",
        toggle: this.toggleInvincibility.bind(this),
      },
      {
        id: "abilityBtn",
        text: "Ability",
        toggle: this.toggleAbility.bind(this),
      },
      { id: "speedBtn", text: "Speed", toggle: this.toggleSpeed.bind(this) },
      { id: "lightBtn", text: "Light", toggle: this.toggleLight.bind(this) },
    ];

    cheats.forEach(({ id, text, toggle }) => {
      let btn = document.createElement("button");
      btn.id = id;
      btn.textContent = text;
      btn.onclick = () => {
        toggle();
        this.buttonActive(id);
      };

      cheatMenu.appendChild(btn);
      this.buttonActive(id);
    });
  }

  toggleMoney() {
    if (!this.moneyBtn) {
      this.activateMoney();
    } else {
      this.deactivateMoney();
    }
  }

  activateMoney() {
    let gold = this.playerInventory.items.find(
      (item) => item.name === "Gold-Coin"
    );

    if (!gold) {
      this.playerInventory.addItem("Gold-Coin", 1000000000000);
    } else {
      this.originalGold = gold.quantity;
      gold.quantity += 1000000000000;
    }

    this.moneyBtn = true;
  }

  deactivateMoney() {
    let gold = this.playerInventory.items.find(
      (item) => item.name === "Gold-Coin"
    );
    if (gold) {
      gold.quantity = this.originalGold;
      this.playerInventory.updateInventory(this.playerInventory);
    }
    this.moneyBtn = false;
  }

  toggleInvincibility() {
    if (!this.invincibilityBtn) {
      this.activateInvincibility();
    } else {
      this.deactivateInvincibility();
    }
  }

  activateInvincibility() {
    this.player.invincible = true;
    this.invincibilityBtn = true;
  }

  deactivateInvincibility() {
    this.player.invincible = false;
    this.invincibilityBtn = false;
  }

  toggleAbility() {
    if (!this.abilityBtn) {
      this.activateAbility();
    } else {
      this.deactivateAbility();
    }
  }

  activateAbility() {
    this.player.coolDownTime = 0;
    this.player.stunCoolDownTime = 0;
    this.abilityBtn = true;
  }

  deactivateAbility() {
    this.player.abilityDuration = this.originalAbilityDuration;
    this.player.stunCoolDownTime = this.originalStunDuration;
    this.player.coolDown = false;
    this.abilityBtn = false;
  }

  toggleSpeed() {
    if (!this.speedBtn) {
      this.activateSpeed();
    } else {
      this.deactivateSpeed();
    }
  }

  activateSpeed() {
    this.originalSpeed = this.player.speed;
    this.player.speed = 5;
    this.speedBtn = true;
  }

  deactivateSpeed() {
    this.player.speed = this.originalSpeed;
    this.speedBtn = false;
  }

  toggleLight() {
    if (!this.lightBtn) {
      this.activateLight();
    } else {
      this.deactivateLight();
    }
  }

  activateLight() {
    this.originalLightLevel = this.player.lightLevel;
    this.player.lightLevel = 0;
    this.lightBtn = true;
  }

  deactivateLight() {
    this.player.lightLevel = this.originalLightLevel;
    this.lightBtn = false;
  }

  buttonActive(id) {
    let button = document.getElementById(id);

    let buttonState = {
      moneyBtn: this.moneyBtn,
      invincibilityBtn: this.invincibilityBtn,
      abilityBtn: this.abilityBtn,
      speedBtn: this.speedBtn,
      lightBtn: this.lightBtn,
    };

    if (buttonState[id]) {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "";
    }
  }
}
