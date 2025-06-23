import { assets } from "../Resources/resources.js";
import { createSpan, createButton } from "../UI/UIHelpers.js";
import { playAudio } from "../Audio/audio.js";

export class shop {
  constructor(player, playerInventory) {
    this.upgrades = [
      {
        name: "Speed",
        cost: 25,
        explanation: "Increase movement speed by 0.1",
        srcName: "speed",
      },
      {
        name: "Light Level",
        cost: 25,
        explanation: "Increase light level by 5",
        srcName: "light",
      },
      {
        name: "Ability Duration",
        cost: 25,
        explanation: "Increase Ability Duration by 1 second",
        srcName: "duration",
      },
      {
        name: "Ability Cool Down",
        cost: 25,
        explanation: "Decrease Cool Down time by 1 second",
        srcName: "coolDown",
      },
    ];
    this.shop = [
      {
        name: "Essence-of-Life",
        sellPrice: 5,
        buyPrice: 20,
        explanation: "A potion that restores a 1 heart of health.",
        srcName: "health",
      },
      {
        name: "Vial-of-Velocity",
        sellPrice: 5,
        buyPrice: 20,
        explanation: "A potion that doubles your movement speed for 5 seconds.",
        srcName: "speed",
      },
      {
        name: "Luminous-Draught",
        sellPrice: 5,
        buyPrice: 15,
        explanation: "A potion that allows you to see all for 5 seconds.",
        srcName: "light",
      },
      {
        name: "Tonic-of-Time",
        sellPrice: 5,
        buyPrice: 15,
        explanation:
          "A potion that increases the duration of your potion by 1 second.",
        srcName: "coolDown",
      },
    ];
    this.player = player;
    this.playerInventory = playerInventory;
    this.coinSound = assets.audio.goldCoin;
    this.potionSound = assets.audio.buyPotion;
    this.pageTurnSound = assets.audio.pageTurning;
  }

  updateShop() {
    // Sell List
    let sellItems = document.getElementById("sellList");
    sellItems.innerHTML = "";

    this.playerInventory.items.forEach((item) => {
      if (item.quantity > 0) {
        let costSpan =
          item.name === "Gold-Coin"
            ? null
            : createSpan("itemCost", `Sell Price: ${item.sellPrice}`);
        let itemSrc =
          item.name === "Gold-Coin"
            ? assets.icons.goldCoin.src
            : assets.potions[item.srcName].src;

        let button = createButton(
          item.name,
          `${item.name} (${item.quantity})`,
          "itemText",
          itemSrc,
          item.name,
          costSpan,
          () => this.sellItem(item.name, 1, item.sellPrice),
          item.explanation
        );
        sellItems.appendChild(button);
      }
    });
    // Upgrade List
    let upgrades = document.getElementById("upgradeList");
    upgrades.innerHTML = "";
    this.upgrades.forEach((upgrade) => {
      let costSpan = createSpan("upgradeCost", `${upgrade.cost} gold`);
      let imgSrc = assets.icons[upgrade.srcName]?.src;

      if (!imgSrc) {
        console.warn(`No icon found for upgrade: ${upgrade.name}`);
      }

      let button = createButton(
        upgrade.name,
        upgrade.name,
        "upgradeText",
        imgSrc || "",
        `${upgrade.name} image`,
        costSpan,
        () => this.buyUpgrade(upgrade.name, upgrade.cost),
        upgrade.explanation
      );
      upgrades.appendChild(button);
    });

    // Buy List
    let buyItems = document.getElementById("buyList");
    buyItems.innerHTML = "";
    this.shop.forEach((item) => {
      let costSpan = createSpan("itemCost", `Buy Price ${item.buyPrice} gold`);
      let imgSrc = assets.potions[item.srcName].src;

      let button = createButton(
        item.name,
        item.name,
        "itemText",
        imgSrc,
        item.name,
        costSpan,
        () => this.buyItem(item, 1),
        item.explanation
      );
      buyItems.appendChild(button);
    });

    this.playerInventory.updateInventory(this.playerInventory);
  }

  sellItem(name, quantity, sellPrice) {
    let item = this.playerInventory.items.find((item) => item.name === name);

    if (item && item.quantity >= quantity && name !== "Gold-Coin") {
      item.quantity -= quantity;
      playAudio(this.coinSound, "Effects");
      this.playerInventory.addItem("Gold-Coin", sellPrice);
      this.updateShop();
    }
  }

  buyUpgrade(upgrade, cost) {
    switch (upgrade) {
      case "Speed":
        if (this.player.speed < this.player.maxSpeed) {
          if (this.payForItem(cost)) {
            this.player.speed += 0.1;
            playAudio(this.pageTurnSound, "Effects");
          }
        } else this.playerInventory.errorMessage("Upgrade limit reached");
        break;
      case "Ability Duration":
        if (this.player.abilityDuration < this.player.maxAbilityDuration) {
          if (this.payForItem(cost)) {
            this.player.abilityDuration += 100;
            playAudio(this.pageTurnSound, "Effects");
          }
        } else this.playerInventory.errorMessage("Upgrade limit reached");
        break;
      case "Light Level":
        if (this.player.lightLevel < this.player.maxLightLevel) {
          if (this.payForItem(cost)) {
            this.player.lightLevel += 5;
            playAudio(this.pageTurnSound, "Effects");
          }
        } else this.playerInventory.errorMessage("Upgrade limit reached");
        break;
      case "Ability Cool Down":
        if (this.player.coolDownTime > this.player.maxCoolDownTime) {
          if (this.payForItem(cost)) {
            this.player.coolDownTime -= 100;
            playAudio(this.pageTurnSound, "Effects");
          }
        } else this.playerInventory.errorMessage("Upgrade limit reached");
        break;
    }
    this.updateShop();
  }
  buyItem(item, quantity) {
    if (this.payForItem(item.buyPrice)) {
      playAudio(this.potionSound, "Effects");
      this.playerInventory.addItem(
        item.name,
        quantity,
        item.sellPrice,
        item.buyPrice,
        item.explanation,
        item.srcName
      );
    }
    this.updateShop();
  }

  payForItem(amount) {
    let gold = this.playerInventory.items.find(
      (item) => item.name === "Gold-Coin"
    );
    if (!gold) gold = { quantity: 0 };

    if (gold.quantity >= amount) {
      gold.quantity -= amount;
      return true;
    } else {
      this.playerInventory.errorMessage(
        "It appears your gold reserves have been depleted."
      );
      return false;
    }
  }
}
