export function mapCollision(obj, level, posX, posY) {
  let collisionTiles = [
    0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 42, 44, 45, 50, 53, 54, 55, 51,
    40, 41, 52, 43, 69, 79,
  ];

  //Topleft corner
  let topLX = Math.floor(posX / tileSize);
  let topLY = Math.floor(posY / tileSize);
  //Top right corner
  let topRX = Math.floor((posX + obj.hitBoxX) / tileSize);
  //Bottom left corner
  let bottomLY = Math.floor((posY + obj.hitBoxY) / tileSize);
  let bottomLX = Math.floor(posX / tileSize);

  //Bottom right corner
  let bottomRX = Math.floor((posX + obj.hitBoxX) / tileSize);
  let bottomRY = Math.floor((posY + obj.hitBoxY) / tileSize);

  let topLeftTile = level[topLY][topLX];
  let bottomRightTile = level[bottomRY][bottomRX];
  let topRightTile = level[topLY][topRX];
  let bottomLeftTile = level[bottomLY][bottomLX];
  if (
    collisionTiles.includes(topLeftTile) ||
    collisionTiles.includes(bottomRightTile) ||
    collisionTiles.includes(topRightTile) ||
    collisionTiles.includes(bottomLeftTile)
  ) {
    return true;
  }
  return false;
}
