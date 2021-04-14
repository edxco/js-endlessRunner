export default class Win extends Phaser.Scene {
  constructor() {
    super('Win');
  }

  preload() {
    this.load.image('bg', '../src/assets/props/bg.png');
    this.load.html('playerForm', 'assets/text/nameform.html');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const layOutX = (width / 2) - 200

    this.add.image(400, 300, 'bg')

    let score = localStorage.getItem('score');
    let time = localStorage.getItem('time');
    
    time = Math.round(time/1000);
    let total = score / time * score * 100;

    this.text1 = this.add.text(layOutX, 100, 'The warrior has arrived to its destination', {
      fontFamily: 'equipmentPro',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '49px',
      fill: '#265CFF'
    });

    this.text1 = this.add.text(layOutX, 180, `Points: ${score}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754'
    });

    this.tweens.add({
      targets: this.text1,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 1000
    });

    this.text2 = this.add.text(layOutX, 220, `Your time: ${time}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#B25754'
    });

    this.tweens.add({
      targets: this.text2,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 1500
    });

    this.text3 = this.add.text(layOutX, 330, `Your Score: ${Math.round(total * 10)}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 5,
      fontSize: '46px',
      fill: '#265CFF'
    });

    this.tweens.add({
      targets: this.text3,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 2500
    });

  }

}