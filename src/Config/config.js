import '../phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'edxco',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: true
    }
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
  }
};  