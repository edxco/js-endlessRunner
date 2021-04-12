import '../phaser';

const gameOver = (player, status) => {
  if ((player.y > 600)||(status === true)) {
    console.log('game Over');
    this.scene.add("Game");
  }
}

export default gameOver;