import { playAudio } from "../Audio/audio.js";
import { assets } from "../Resources/resources.js";

export class Chest {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.width = 16;
    this.height = 16;
    this.loot = [];
    this.isOpen = false;
    this.tileX = 1;
    this.tileY = 8;
    this.tileWidth = 16;
    this.tileHeight = 16;

    this.openChestSound = assets.audio.openChest;
    this.drops = [
      {
        name: "Gold-Coin",
        chance: 80,
        minAmount: 20,
        maxAmount: 100,
        sellPrice: 0,
        buyPrice: 0,

        srcName: "goldCoin",
      },
      {
        name: "Essence-of-Life",
        chance: 40,
        minAmount: 1,
        maxAmount: 2,
        sellPrice: 5,
        buyPrice: 20,
        explanation: "A potion that restores a 1 heart of health.",
        srcName: "health",
      },
      {
        name: "Vial-of-Velocity",
        chance: 60,
        minAmount: 1,
        maxAmount: 3,
        sellPrice: 5,
        buyPrice: 20,
        explanation: "A potion that doubles your movement speed for 5 seconds.",
        srcName: "speed",
      },
      {
        name: "Luminous-Draught",
        chance: 100,
        minAmount: 1,
        maxAmount: 1,
        sellPrice: 5,
        buyPrice: 15,
        explanation:
          "A potion that allows you to see everything for 5 seconds.",
        srcName: "light",
      },
      {
        name: "Tonic-of-Time",
        chance: 100,
        minAmount: 1,
        maxAmount: 1,
        sellPrice: 5,
        buyPrice: 15,
        explanation:
          "A potion that increases the duration of potions by 1 second.",
        srcName: "coolDown",
      },
    ];
  }

  draw(context, tileSet) {
    context.drawImage(
      tileSet,
      this.tileX * this.tileWidth,
      this.tileY * this.tileHeight,
      this.tileWidth,
      this.tileHeight,
      this.posX,
      this.posY,
      this.tileWidth,
      this.tileHeight
    );
    if (this.isOpen) {
      this.tileX = 0;
      context.drawImage(
        tileSet,
        this.tileX * this.tileWidth,
        this.tileY * this.tileHeight,
        this.tileWidth,
        this.tileHeight,
        this.posX,
        this.posY,
        this.tileWidth,
        this.tileHeight
      );
    }
  }

  openChest(inventory) {
    if (!this.isOpen) {
      this.isOpen = true;
      playAudio(this.openChestSound, "Effects");
      this.loot.forEach((item) => {
        inventory.addItem(
          item.name,
          item.quantity,
          item.sellPrice,
          item.buyPrice,
          item.explanation,
          item.srcName
        );
      });
      this.loot = [];
    }
  }

  getRandomPercentage() {
    return Math.random() * 100;
  }

  getRandomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addLoot() {
    this.drops.forEach((item) => {
      let randomValue = this.getRandomPercentage();
      if (randomValue <= item.chance) {
        let quantity = this.getRandomAmount(item.minAmount, item.maxAmount);
        this.loot.push({
          name: item.name,
          quantity: quantity,
          sellPrice: item.sellPrice,
          buyPrice: item.buyPrice,
          explanation: item.explanation,
          srcName: item.srcName,
        });
      }
    });
  }

  static createChests(level, tileSize) {
    let chests = [];

    for (let row = 0; row < level.length; row++) {
      for (let col = 0; col < level[row].length; col++) {
        if (level[row][col] === 29) {
          let posX = col * tileSize;
          let posY = row * tileSize;
          chests.push(new Chest(posX, posY));
        }
      }
    }
    return chests;
  }
}
