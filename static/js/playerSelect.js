import { player } from "./src/Player/player.js";
import { assets } from "./src/Resources/resources.js";
import { playerData } from "./src/Player/hero.js";
import { getAudioBtn } from "./src/Audio/audio.js";

let sprite = new Image();
let menuAudioSound = assets.audio.menuAudio;
export let selectedHero = localStorage.getItem("selectedHero") || "knight";

let players = [
  {
    name: "knight",
    health: playerData.knight.maxHealth,
    speed: playerData.knight.speed,
    lightLevel: playerData.knight.lightLevel,
    ability: "Ironclad Barrier",
    abilityDescription:
      "Conjuring a force of unbreakable resolve, the Knight summons a shimmering, impenetrable shield forged from the essence of steel itself. It stands as a towering bastion, deflecting any blow with the might of an ancient fortress, a testament to the strength of their will.",
  },
  {
    name: "ninja",
    health: playerData.ninja.maxHealth,
    speed: playerData.ninja.speed,
    lightLevel: playerData.ninja.lightLevel,
    ability: "Velocity Surge",
    abilityDescription:
      "The ninja’s body blurs into a streak of lightning as they channel their inner speed, igniting a surge of movement that transcends the limits of the mortal realm. For a fleeting moment, they become an unstoppable force, a shadow that strikes faster than the eye can follow.",
  },
  {
    name: "monk",
    health: playerData.monk.maxHealth,
    speed: playerData.monk.speed,
    lightLevel: playerData.monk.lightLevel,
    ability: "Soul Rebirth",
    abilityDescription:
      "The monk taps into the ancient wellspring of life itself, allowing their spirit to mend and their body to regenerate with unyielding vigor. Wounds close, fatigue vanishes, and a radiant aura pulses from within, as though the very essence of their soul is reborn with each breath they take.",
  },
  {
    name: "vampire",
    health: playerData.vampire.maxHealth,
    speed: playerData.vampire.speed,
    lightLevel: playerData.vampire.lightLevel,
    ability: "Nocturnal Sight",
    abilityDescription:
      " For a brief moment, the vampire taps into the essence of the shadows, granting them the power to perceive all that surrounds them—every movement, every whisper, and every hidden detail in their environment.",
  },
  // {
  //   name: "bear",
  //   health: playerData.bear.maxHealth,
  //   speed: playerData.bear.speed,
  //   lightLevel: playerData.bear.lightLevel,
  //   ability: "Bear Hug",
  //   abilityDescription:
  //     "The bear channels its primal strength, launching itself forward with a thunderous roar, crashing into foes with the force of a mountain. The impact sends shockwaves through the ground, stunning enemies and leaving them vulnerable to the bear's relentless assault.",
  // },
];

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  if (assets) {
    createPlayerSelect();
  } else {
    setTimeout(init, 100);
  }
  getAudioBtn("heroButton", menuAudioSound, "Interface");
  confirmPlayer();
}

function createPlayerSelect() {
  let table = document.getElementById("playerSelectMenu");

  for (let i = 0; i < players.length; i += 4) {
    let row = document.createElement("tr");

    for (let j = i; j < i + 4; j++) {
      if (j < players.length) {
        let cell = document.createElement("td");
        let button = document.createElement("button");
        button.classList.add("heroButton");
        button.id = players[j].name;

        let img = document.createElement("img");
        img.src = assets.heroFace[players[j].name].src;
        img.alt = players[j].name;

        button.appendChild(img);
        cell.appendChild(button);
        row.appendChild(cell);
      }
    }
    table.appendChild(row);
  }
  let hoveredHero = document.querySelectorAll(".heroButton");

  hoveredHero.forEach((hero) => {
    hero.addEventListener(
      "mouseover",
      () => {
        setPlayerInfo(hero.id);
      },
      false
    );
    hero.addEventListener("click", () => changeHero(hero.id), false);
  });
}

function changeHero(hero) {
  selectedHero = hero;
  localStorage.setItem("selectedHero", hero);

  let playerStats = players.find((player) => player.name === hero);

  let playerSelect = document.getElementById("playerSelect");
  playerSelect.innerHTML = "";
  let heroImg = document.createElement("img");

  heroImg.src = assets.heroFace[hero].src;
  let heroName = document.createElement("p");
  heroName.textContent = playerStats.name;
  playerSelect.appendChild(heroImg);
  playerSelect.appendChild(heroName);
}

function setPlayerInfo(heroName) {
  sprite.src = assets.heroFace[heroName].src;
  playerStats(heroName);
}

function playerStats(heroName) {
  if (heroName) {
    let playerInfo = document.getElementById("playerStats");
    playerInfo.innerHTML = "";
    let stats = document.createElement("div");

    let playerStats = players.find((player) => player.name === heroName);

    let playerName = document.createElement("h1");
    playerName.textContent = playerStats.name.toUpperCase();
    playerInfo.appendChild(playerName);

    let healthDiv = document.createElement("div");
    let playerHealth = document.createElement("p");
    playerHealth.textContent = `Health: ${playerStats.health}`;
    let healthImg = document.createElement("img");
    healthImg.src = assets.icons.health.src;
    healthDiv.appendChild(healthImg);
    healthDiv.appendChild(playerHealth);
    stats.appendChild(healthDiv);

    let speedDiv = document.createElement("div");
    let playerSpeed = document.createElement("p");
    playerSpeed.textContent = `Speed: ${playerStats.speed}`;
    let speedImg = document.createElement("img");
    speedImg.src = assets.icons.speed.src;
    speedDiv.appendChild(speedImg);
    speedDiv.appendChild(playerSpeed);
    stats.appendChild(speedDiv);

    let lightDiv = document.createElement("div");

    let lightLevel = document.createElement("p");
    lightLevel.textContent = `Light: ${playerStats.lightLevel}`;
    let lightImg = document.createElement("img");
    lightImg.src = assets.icons.light.src;
    lightDiv.appendChild(lightImg);
    lightDiv.appendChild(lightLevel);
    stats.appendChild(lightDiv);

    playerInfo.append(stats);

    let abilityDiv = document.createElement("section");
    let playerAbility = document.createElement("h2");
    playerAbility.textContent = `Ability: ${playerStats.ability}`;
    let abilityDescription = document.createElement("p");
    abilityDescription.textContent = playerStats.abilityDescription;
    abilityDiv.appendChild(playerAbility);
    abilityDiv.appendChild(abilityDescription);
    playerInfo.appendChild(abilityDiv);
  }
}
function confirmPlayer() {
  let confirmPlayerBtn = document.getElementById("confirmPlayerBtn");

  confirmPlayerBtn.addEventListener("click", () => {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/homepage";
  });
}
