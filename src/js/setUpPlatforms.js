import Phaser from 'phaser';

const setUpPlatforms = (platforms, texture, worldBounds) => {
  const platformWidth = 98;

  // Initial platform
  platforms.create(50, 400, texture);

  // Populate all platforms
  for (let x = 200; x <= worldBounds; x) {
    const posY = Phaser.Math.Between(450, 560);
    const posX = Phaser.Math.Between(50, 180);
    platforms.create(x, posY, texture);
    x = x + posX + platformWidth;
  }
};

export default setUpPlatforms;