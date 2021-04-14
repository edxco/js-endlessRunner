import './style.css';

import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/gameScene';
import BootScene from './Scenes/bootScene';
import PreloaderScene from './Scenes/preloaderScene';
import History from './Scenes/history';
import winScene from './Scenes/winScene';
import TitleScene from './Scenes/titleScene';
import CreditsScene from './Scenes/creditScene';
import gameOverScene from './Scenes/gameOverScene';
import scoreBoard from './Scenes/scoreBoard';

class Game extends Phaser.Game {
    constructor () {
      super(config);

      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('History', History);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('GameOver', gameOverScene);
      this.scene.add('Win', winScene);
      this.scene.add('Game', GameScene);
      this.scene.add('ScoreBoard', scoreBoard);
      this.scene.start('Boot');
    }
  }
   
  window.game = new Game();