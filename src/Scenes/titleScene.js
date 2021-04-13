import 'phaser';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    //Center text
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

    this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    this.add.image(400, 550, 'logo').setScale(0.5);

    this.add.text(screenCenterX, 100, '- Ice Warrior -', {
      fontFamily: 'EquipmentPro',
      stroke: '#DA1F4C',
      strokeThickness: 12,
      fontSize: 60
    }).setOrigin(0.5);

    // Menu Options

    const start = this.add.text(screenCenterX, 300, 'Start', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#000',
      strokeThickness: 8
    }).setOrigin(0.5);

    const score = this.add.text(screenCenterX, 350, 'Scores', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#000',
      strokeThickness: 8
    }).setOrigin(0.5);

    const credits = this.add.text(screenCenterX, 400, 'Credits', {
      fontFamily: 'EquipmentPro',
      fontSize: 44,
      stroke: '#000',
      strokeThickness: 8
    }).setOrigin(0.5);

    start
      .setInteractive();

    score
      .setInteractive({
        useHandCursor: true
      });

    credits
      .setInteractive({
        useHandCursor: true
      });

    start
      .on('pointerover', () => {
        this.enterButtonHoverState(start)
      })
      .on('pointerdown', () => {
        this.clickButton('History')
      })
      .on('pointerout', () => {
        this.enterButtonRestState(start)
      });

    score
      .on('pointerover', () => {
        this.enterButtonHoverState(score)
      })
      .on('pointerdown', () => {
        this.clickButton('Score')
      })
      .on('pointerout', () => {
        this.enterButtonRestState(score)
      });

      credits
      .on('pointerover', () => {
        this.enterButtonHoverState(credits)
      })
      .on('pointerdown', () => {
        this.clickButton('Credits')
      })
      .on('pointerout', () => {
        this.enterButtonRestState(credits)
      });
  }

  enterButtonHoverState(btn) {
    btn.setStyle({
      fill: '#DA1F4C'
    });
  }

  enterButtonRestState(btn) {
    btn.setStyle({
      fill: '#fff'
    });
  }

  clickButton(scene) {
    this.scene.switch(scene);
  }

}

export default TitleScene;