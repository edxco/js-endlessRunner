const repeat = (platforms, texture) => {
  let x = 0;
  const count = 4;
  for (let i = 0; i < count; i += 1) {
    platforms.create(x, 590, texture)
      .setScrollFactor(0.5);
    x += 32;
  }
};

export default repeat;