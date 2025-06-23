export function camera(
  canvas,
  context,
  posX,
  posY,
  playerWidth,
  playerHeight,
  tileSize,
  level
) {
  // Calculate camera offset based on player's position
  let cameraX = posX - canvas.width / 2 + playerWidth / 2;
  let cameraY = posY - canvas.height / 2 + playerHeight / 2;

  // Make sure the camera doesn't go out of the map bounds
  cameraX = Math.max(
    0,
    Math.min(cameraX, level[0].length * tileSize - canvas.width)
  );

  cameraY = Math.max(
    0,
    Math.min(cameraY, level.length * tileSize - canvas.height)
  );

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(-cameraX, -cameraY);
}
