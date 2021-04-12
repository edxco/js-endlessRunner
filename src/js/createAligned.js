const createAligned = (scene, totalWidth, texture, scrollFactor, worldBounds, setOrigi) => {
	const w = scene.textures.get(texture).getSourceImage().width
	const count = Math.ceil(totalWidth / w) * scrollFactor

	for (let x = 0; x <= worldBounds; x)
	{
		const m = scene.add.image(x, scene.scale.height, texture)
			.setOrigin(0, setOrigi)
			.setScrollFactor(scrollFactor)

		x += m.width
	}
}

export default createAligned;