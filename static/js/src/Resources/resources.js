// assets.js
export let assets = {
  tileSet: new Image(),
  enemySprites: {
    slime: new Image(),
    skullHead: new Image(),
  },
  heroSprites: {
    ninja: new Image(),
    knight: new Image(),
    monk: new Image(),
    vampire: new Image(),
    bear: new Image(),
  },
  trapSprites: {
    fire: new Image(),
    spike: new Image(),
  },
  chestSprites: {
    goldCoin: new Image(),
  },
  heroFace: {
    ninja: new Image(),
    knight: new Image(),
    monk: new Image(),
    vampire: new Image(),
    bear: new Image(),
  },
  icons: {
    health: new Image(),
    light: new Image(),
    coolDown: new Image(),
    duration: new Image(),
    speed: new Image(),
    goldCoin: new Image(),
  },
  potions: {
    health: new Image(),
    speed: new Image(),
    light: new Image(),
    coolDown: new Image(),
  },
  heartImage: new Image(),
  audio: {
    bgMusic: new Audio(),
    menuAudio: new Audio(),
    goldCoin: new Audio(),
    buyPotion: new Audio(),
    drinkPotion: new Audio(),
    openChest: new Audio(),
    errorMessage: new Audio(),
    stunThrow: new Audio(),
    pageTurning: new Audio(),
    playerHurt: new Audio(),
  },
};

let assetsList = [
  { var: assets.tileSet, url: "../static/assets/maps/Dungeon_Tileset1.png" },
  { var: assets.enemySprites.slime, url: "static/assets/Enemy/Slime.png" },
  {
    var: assets.enemySprites.skullHead,
    url: "../static/assets/Enemy/skull.png",
  },
  { var: assets.trapSprites.fire, url: "../static/assets/Traps/fireTrap.png" },
  {
    var: assets.trapSprites.spike,
    url: "../static/assets/Traps/spikeTrap.png",
  },
  { var: assets.heroSprites.ninja, url: "../static/assets/Heros/ninja.png" },
  { var: assets.heroSprites.knight, url: "../static/assets/Heros/knight.png" },
  { var: assets.heroSprites.monk, url: "../static/assets/Heros/monk.png" },
  {
    var: assets.heroSprites.vampire,
    url: "../static/assets/Heros/vampire.png",
  },
  { var: assets.heroSprites.bear, url: "../static/assets/Heros/bear.png" },
  {
    var: assets.heroFace.ninja,
    url: "../static/assets/PlayerSelectMenu/ninja.png",
  },
  {
    var: assets.heroFace.knight,
    url: "../static/assets/PlayerSelectMenu/knight.png",
  },
  {
    var: assets.heroFace.monk,
    url: "../static/assets/PlayerSelectMenu/monk.png",
  },
  {
    var: assets.heroFace.vampire,
    url: "../static/assets/PlayerSelectMenu/vampire.png",
  },
  {
    var: assets.heroFace.bear,
    url: "../static/assets/PlayerSelectMenu/bear.png",
  },
  { var: assets.icons.health, url: "../static/assets/UI/Icons/health.png" },
  { var: assets.icons.light, url: "../static/assets/UI/Icons/light.png" },
  {
    var: assets.icons.coolDown,
    url: "../static/assets/UI/Icons/coolDown.png",
  },
  { var: assets.icons.duration, url: "../static/assets/UI/Icons/duration.png" },
  { var: assets.icons.speed, url: "../static/assets/UI/Icons/speed.png" },
  { var: assets.icons.goldCoin, url: "../static/assets/UI/Icons/goldCoin.png" },
  {
    var: assets.potions.health,
    url: "../static/assets/UI/potions/Essence-of-Life.png",
  },
  {
    var: assets.potions.speed,
    url: "../static/assets/UI/potions/Vial-of-Velocity.png",
  },
  {
    var: assets.potions.light,
    url: "../static/assets/UI/potions/Luminous-Draught.png",
  },
  {
    var: assets.potions.coolDown,
    url: "../static/assets/UI/potions/Tonic-of-Time.png",
  },
  { var: assets.heartImage, url: "static/assets/UI/skullHead.png" },
  { var: assets.audio.bgMusic, url: "static/audio/music.mp3" },
  {
    var: assets.audio.menuAudio,
    url: "../static/audio/menuClick.wav",
  },
  { var: assets.audio.goldCoin, url: "static/audio/goldSpent.mp3" },
  { var: assets.audio.buyPotion, url: "static/audio/buyPotion.mp3" },
  { var: assets.audio.drinkPotion, url: "static/audio/drinkPotion.mp3" },
  { var: assets.audio.openChest, url: "static/audio/openChest.mp3" },
  { var: assets.audio.errorMessage, url: "static/audio/errorMessage.mp3" },
  { var: assets.audio.stunThrow, url: "static/audio/stunThrow.mp3" },
  { var: assets.audio.pageTurning, url: "static/audio/pageTurning.mp3" },
  { var: assets.audio.playerHurt, url: "static/audio/playerHurt.mp3" },
];

export function load_assets() {
  let num_assets = assetsList.length;
  let loaded = function () {
    console.log("loaded");
    num_assets = num_assets - 1;
  };

  for (let asset of assetsList) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}
