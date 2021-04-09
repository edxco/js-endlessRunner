import './style.css';
// import createAligned from './js/createAligned'
// import repeat from './js/repeat'

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/gameScene';
import BootScene from './Scenes/bootScene';
import PreloaderScene from './Scenes/preloaderScene';
import TitleScene from './Scenes/titleScene';
import OptionsScene from './Scenes/optionsScene';
import CreditsScene from './Scenes/creditScene';

class Game extends Phaser.Game {
    constructor () {
      super(config);

      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('Options', OptionsScene);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('Game', GameScene);
      this.scene.start('Game');
    }
  }
   
  window.game = new Game();

