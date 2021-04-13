import './style.css';

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/gameScene';
import BootScene from './Scenes/bootScene';
import PreloaderScene from './Scenes/preloaderScene';
import History from './Scenes/history';
import TitleScene from './Scenes/titleScene';
import OptionsScene from './Scenes/optionsScene';
import CreditsScene from './Scenes/creditScene';
import gameOverScene from './Scenes/gameOverScene';

class Game extends Phaser.Game {
    constructor () {
      super(config);

      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('Options', OptionsScene);
      this.scene.add('History', History);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('GameOver', gameOverScene);
      this.scene.add('Game', GameScene);
      this.scene.start('Boot');
    }
  }
   
  window.game = new Game();

