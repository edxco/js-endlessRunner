import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'edxco',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
      debug: false,
    },
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
  },
};