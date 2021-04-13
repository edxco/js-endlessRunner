export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.load.image('bg', '../src/assets/props/gameover.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.image(400, 300, 'bg')

    let score = localStorage.getItem('score');
    let time = localStorage.getItem('time');
    
    time = Math.round(time/1000);
    let total = score / time * score * 100 - 1500;
    console.log(total)

    let rand_penalty = (total < 100000) ? Phaser.Math.Between(9000,30000) : Phaser.Math.Between(30001,50000);

    total = total - rand_penalty;

    this.text1 = this.add.text((width / 2) - 100, 100, 'You lost!', {
      fontFamily: 'equipmentPro',
      align: 'center',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '49px',
      fill: '#261935'
    }).setWordWrapWidth(750);

    this.text1 = this.add.text((width / 2) - 100, 180, `Points: ${score}`, {
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

    this.text2 = this.add.text((width / 2) - 100, 220, `Your time: ${time}`, {
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

    this.text3 = this.add.text((width / 2) - 100, 260, `Penalty: ${rand_penalty}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 8,
      fontSize: '32px',
      fill: '#FF0000'
    });

    this.tweens.add({
      targets: this.text3,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.easeIn',
      duration: 2000
    });

    this.text3 = this.add.text((width / 2) - 100, 370, `Your Score: ${Math.round(total * 10)}`, {
      fontFamily: 'equipmentPro',
      stroke: '#fff',
      strokeThickness: 5,
      fontSize: '46px',
      fill: '#762D48'
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