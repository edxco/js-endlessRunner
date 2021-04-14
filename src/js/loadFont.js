const loadFont = (name, url) => {
  const newFont = new FontFace(name, `url(${url})`);
  newFont.load().then((loaded) => {
    document.fonts.add(loaded);
  }).catch((error) => error);
};

export default loadFont;