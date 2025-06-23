export function updateInventory(playerInventory) {
  let inventory = document.getElementById("inventoryList");
  inventory.innerHTML = "";
  playerInventory.items.forEach((item) => {
    let itemDiv = document.createElement("button");
    itemDiv.classList.add("inventory-item");
    itemDiv.id = `${item.name}`;
    itemDiv.innerHTML = `${item.quantity} x ${item.name}`;
    inventory.appendChild(itemDiv);
  });
}

export function UIScreenShake(canvas) {
  if (canvas) {
    canvas.classList.add("shake");
    canvas.addEventListener("animationend", function () {
      canvas.classList.remove("shake");
    });
  } else {
    console.error("Canvas element is not found.");
  }
}

export function createHealthBar(maxHealth, heartImage) {
  let healthBar = document.getElementById("healthBar");
  healthBar.innerHTML = "";

  for (let i = 0; i < maxHealth; i++) {
    let heartDiv = document.createElement("img");
    let heartClone = heartImage.cloneNode(true);
    heartClone.classList.add("health");
    heartClone.id = `health${i + 1}`;
    healthBar.appendChild(heartClone);
  }
}

export function createButton(
  id,
  name,
  textClass,
  imgSrc,
  altText,
  extraSpan = null,
  onClick,
  tooltip = null
) {
  let button = document.createElement("button");
  button.classList.add("shopItem");
  button.id = id;
  if (tooltip) {
    button.setAttribute("data-tooltip", tooltip);
  }

  let text = document.createElement("span");
  text.classList.add(textClass);
  text.innerHTML = name;
  let img = document.createElement("img");
  img.src = imgSrc;
  img.alt = altText;
  button.appendChild(text);
  button.appendChild(img);
  if (extraSpan) {
    button.appendChild(extraSpan);
  }
  button.addEventListener("click", onClick);
  return button;
}

export function createSpan(className, innerHTML) {
  let span = document.createElement("span");
  span.classList.add(className);
  span.innerHTML = innerHTML;
  return span;
}

export function gameOver(raf) {
  cancelAnimationFrame(raf);
  let gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.innerHTML = "";
  gameOverScreen.style.display = "flex";
  let textDiv = document.createElement("div");
  let gameOverText = document.createElement("h1");
  gameOverText.classList.add("gameOverText");
  gameOverText.innerHTML = "Game Over!";
  let restartButton = document.createElement("button");
  restartButton.classList.add("restartButton");
  restartButton.innerHTML = "Restart Game";
  restartButton.addEventListener("click", function () {
    window.location.reload();
  });
  let homePageButton = document.createElement("button");
  homePageButton.classList.add("homePageButton");
  homePageButton.innerHTML = "Home Page";
  homePageButton.addEventListener("click", function () {
    window.location.href =
      "https://cs1.ucc.ie/~tjs2/cgi-bin/ca2/run.py/homepage";
  });
  textDiv.append(homePageButton);
  textDiv.append(restartButton);
  gameOverScreen.appendChild(gameOverText);
  gameOverScreen.append(textDiv);
}

export function displayPotionEffect(item, assets, Duration) {
  if (!item) return;
  let potionDiv = document.getElementById("potionEffect");
  potionDiv.style.display = "block";
  let potionUl = potionDiv.querySelector("ul");
  if (!potionUl) {
    potionUl = document.createElement("ul");
    potionDiv.appendChild(potionUl);
  }
  let potionLi = document.createElement("li");
  let potionImg = document.createElement("img");
  potionImg.src = assets.potions[item.srcName].src;
  potionImg.alt = item.name;
  potionLi.appendChild(potionImg);
  potionUl.appendChild(potionLi);
  setTimeout(() => {
    potionLi.classList.add("flash");
  }, Duration - 2000);
  setTimeout(() => {
    potionLi.remove();
    potionDiv.style.display = "none";
  }, Duration);
}

export function UIaddLoot(item) {
  if (!item) return;
  let inventoryChat = document.getElementById("InventoryNotifications");
  inventoryChat.style.display = "block";
  let lootNotification = inventoryChat.querySelector("ul");
  if (!lootNotification) {
    lootNotification = document.createElement("ul");
    inventoryChat.appendChild(lootNotification);
  }
  let lootItem = document.createElement("li");
  lootItem.textContent = `${item.quantity} x ${item.name}`;
  lootNotification.appendChild(lootItem);
  setTimeout(() => {
    lootNotification.remove();
    inventoryChat.style.display = "none";
  }, 3000);
}

export function abilityActiveUI() {
  let abilityBar = document.getElementById("skullBar");
  abilityBar.style.opacity = 0.1;
  let window = document.documentElement;
  window.style.boxShadow = "0px 0px 10px white inset";
}

export function abilityCoolDownUI(hero) {
  if (hero.isAbilityUIActive) return;
  console.log("abilityCoolDownUI");
  hero.isAbilityUIActive = true;
  let window = document.documentElement;
  window.style.boxShadow = "none";
  let abilityBar = document.getElementById("skullBar");
  let totalTime = hero.coolDownTime / 1000;
  let remainingTime = totalTime;
  console.log(totalTime);

  let interval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      let percent = remainingTime / totalTime;
      percent = 1 - percent;
      abilityBar.style.opacity = percent;
    }
    if (remainingTime === 0) {
      clearInterval(interval);
      hero.isAbilityUIActive = false;
      abilityBar.style.opacity = 1;
      console.log("end");
    }
  }, 1000);
}
