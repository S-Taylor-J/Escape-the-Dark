import { patrollingEnemy, chasingEnemy } from "./enemyTypes.js";

export function spawnEnemies(level, tileSize) {
  let enemyType = {
    73: patrollingEnemy,
    499: chasingEnemy,
  };
  let enemies = [];

  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      let tile = level[row][col];
      let EnemyClass = enemyType[tile];
      if (EnemyClass) {
        let posX = col * tileSize;
        let posY = row * tileSize;
        enemies.push(new EnemyClass(posX, posY));
      }
    }
  }
  return enemies;
}
