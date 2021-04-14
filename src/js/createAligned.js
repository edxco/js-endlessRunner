const createAligned = (scene, texture, scrollFactor, worldBounds, setOrigi) => {
  for (let x = 0; x <= worldBounds; x) {
    const m = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, setOrigi)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

export default createAligned;