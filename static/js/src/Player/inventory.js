import { Potion } from "./potions.js";
import { assets } from "../Resources/resources.js";
import {
  createSpan,
  createButton,
  displayPotionEffect,
  UIaddLoot,
} from "../UI/UIHelpers.js";
import { playAudio } from "../Audio/audio.js";

let potion = new Potion();

export class inventory {
  constructor(player) {
    this.items = [];
    this.maxSize = 10;
    this.player = player;
    this.drinkPotionSound = assets.audio.drinkPotion;
    this.errorMessageSound = assets.audio.errorMessage;
  }

  updateInventory(playerInventory) {
    let inventory = document.getElementById("inventoryList");
    inventory.innerHTML = "";

    playerInventory.items.forEach((item) => {
      if (item.quantity > 0) {
        let itemSrc =
          item.name === "Gold-Coin"
            ? assets.icons.goldCoin.src
            : assets.potions[item.srcName].src;

        let button = createButton(
          item.name,
          `${item.name}(${item.quantity})`,
          "itemText",
          itemSrc,
          item.name,
          null,
          () => this.useItem(item.name, 1, item.sellPrice),
          item.explanation
        );
        inventory.appendChild(button);
      }
    });
    this.playerStats();
  }

  useItem(name) {
    let item = this.items.find((item) => item.name === name);
    if (item && item.quantity && item.name !== "Gold-Coin") {
      if (potion.potionEffect(item.name, this.player)) {
        item.quantity--;
        playAudio(this.drinkPotionSound, "Effects");
        if (item.name !== "Essence-of-Life" && item.name !== "Tonic-of-Time") {
          displayPotionEffect(item, assets, potion.potionDuration);
        }
      } else {
        this.errorMessage("Cannot use item!");
      }
    }
    if (item.quantity === 0) {
      this.items = this.items.filter((i) => i.name !== name);
    } else {
    }
    this.updateInventory(this);
  }

  addItem(name, quantity, sellPrice, buyPrice, explanation, srcName) {
    let existingItem = this.items.find((item) => item.name === name);
    let itemToUpdate = null;

    if (existingItem) {
      existingItem.quantity += quantity;
      itemToUpdate = existingItem;
    } else {
      if (this.items.length < this.maxSize) {
        let newItem = {
          name: name,
          quantity: quantity,
          sellPrice: sellPrice,
          buyPrice: buyPrice,
          explanation: explanation,
          srcName: srcName,
        };
        this.items.push(newItem);
        itemToUpdate = newItem;
      } else {
        this.errorMessage("Inventory is full!");
        return;
      }
    }

    UIaddLoot(itemToUpdate);
  }

  playerStats() {
    let playerStats = document.querySelectorAll(".player_Stats");
    playerStats.forEach((playerStat) => {
      playerStat.innerHTML = "";
      let stats = [
        {
          label: "Health",
          value: this.player.health,
          max: this.player.maxHealth,
        },
        { label: "Speed", value: this.player.speed, max: this.player.maxSpeed },
        {
          label: "Light Level",
          value: this.player.lightLevel,
          max: this.player.maxLightLevel,
        },
        {
          label: "Ability",
          value: this.player.abilityDuration,
          max: this.player.maxAbilityDuration,
        },
        {
          label: "Ability CoolDown Time",
          value: this.player.coolDownTime,
          max: this.player.maxCoolDownTime,
          reverse: true,
        },
      ];

      stats.forEach((stat) => {
        let statContainer = document.createElement("div");
        statContainer.classList.add("statBar");

        let label = document.createElement("span");
        label.textContent = `${stat.label}: ${
          stat.value.toFixed ? stat.value.toFixed(2) : stat.value
        } / ${stat.max.toFixed(2)}`;

        let barWrapper = document.createElement("div");
        barWrapper.classList.add("barWrapper");

        let barFill = document.createElement("div");
        barFill.classList.add("barFill");
        barFill.style.width = `${(stat.value / stat.max) * 100}%`;

        barWrapper.appendChild(barFill);
        statContainer.appendChild(label);
        statContainer.appendChild(barWrapper);
        playerStat.appendChild(statContainer);
      });
    });
  }

  errorMessage(message) {
    playAudio(this.errorMessageSound, "Effects");
    let errorMessages = document.querySelectorAll(".errorMessages");
    errorMessages.forEach((errorMessage) => {
      errorMessage.innerHTML = "";
      let errorMessageText = document.createElement("p");
      errorMessageText.textContent = message;
      errorMessage.appendChild(errorMessageText);
    });
    setTimeout(() => {
      errorMessages.forEach((errorMessage) => {
        errorMessage.innerHTML = "";
      });
    }, 3000);
  }
}
