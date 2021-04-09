const repeat = (platforms, texture) => {
  let x = 0
  let count = 4;
  for (let i = 0; i < count; ++i) {
       const m = platforms.create(x, 590, texture)
          //.setOrigin(0, 590)
          .setScrollFactor(.5)
      x += 32
  }
}

export default repeat;