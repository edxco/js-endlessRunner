const setUpPlatforms = (platforms, texture, worldBounds) => {
  
  const platformWidth = 98;

  //Initial platform
  platforms.create(50, 400, texture)

  // Populate all platforms
  for (let x = 200; x <= worldBounds; x){
    let posY = Phaser.Math.Between(450, 560)
    let posX = Phaser.Math.Between(50, 100)
    platforms.create(x, posY, texture)
    x = x + posX + platformWidth;
    console.log('x',x)
  }
}

export default setUpPlatforms;