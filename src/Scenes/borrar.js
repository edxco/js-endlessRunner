import Phaser from 'phaser';
import Player from '../entities/Player';
import Enemy from '../entities/Enemies';
import Hud from '../hud/container';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.initialScore = 0;
    this.score = {};
    this.hud = new Hud(this, 0, 0).setDepth(1);

    const map = this.createMap();
    const layers = this.createLayers(map);
    const positionSpawn = this.getPlayerPoint(layers.playerSpawn);
    const positionEnd = this.getEnzone(layers.endZone);
    const enemies = this.createEnemies(layers.enemiesSpawn);
    const player = this.createPlayer(positionSpawn);
    this.createEndzone(positionEnd, player);
    const collectables = this.createCollectables(layers.collectable);
    const collectableHealth = this.createHealthCollectables(layers.collectableHealth);
    this.addTween(collectables);

    this.createCamera(player, map);
    this.createPlayerColliders(player, {
      colliders: {
        mapColliders: layers.plant,
        propsColliders: layers.prop,
        bookshelfColliders: layers.bookshelf,
        collectables,
        collectableHealth,
      },
    });
    this.createEnemyColliders(enemies, {
      colliders: {
        player,
      },
    });
    this.listenToEvents();
    this.playerHp = player.hp;
    this.healthUpdate = player.healthBar;
  }

  createMap() {
    const map = this.make.tilemap({
      key: 'map2'
    });
    map.addTilesetImage('Inside', 'inside');

    return map;
  }

  createLayers(map) {
    this.tileset = map.getTileset('Inside');
    const plant = map.createLayer('planthouse', this.tileset).setDepth(-2);
    map.createLayer('over', this.tileset).setDepth(1);
    const prop = map.createLayer('props', this.tileset).setDepth(0);
    const bookshelf = map.createLayer('library', this.tileset).setDepth(2);
    const book = map.createLayer('book', this.tileset);

    plant.setCollisionByProperty({
      collides: true
    });
    bookshelf.setCollisionByProperty({
      collides: true
    });
    prop.setCollisionByProperty({
      collides: true
    });

    const playerSpawn = map.getObjectLayer('PlayerStart');
    const endZone = map.getObjectLayer('end-game');
    const enemiesSpawn = map.getObjectLayer('SpawnEnemy');
    const collectable = map.getObjectLayer('collectables');
    const collectableHealth = map.getObjectLayer('collectableHealth');
    return {
      plant,
      prop,
      bookshelf,
      book,
      playerSpawn,
      endZone,
      enemiesSpawn,
      collectable,
      collectableHealth,
    };
  }

  getPlayerPoint(playerPoint) {
    this.playerSPoint = playerPoint.objects;
    return {
      start: this.playerSPoint.find(zone => zone.name === 'spawnPlayer'),
    };
  }

  getEnzone(endZone) {
    this.EndGame = endZone.objects;
    return {
      end: this.EndGame.find(zone => zone.name === 'end-game'),
    };
  }

  createCollectables(collectableLayer) {
    const collectables = this.physics.add.staticGroup();
    collectableLayer.objects.forEach(item => {
      collectables.get(item.x, item.y, 'memory').setDepth(-1);
    });
    return collectables;
  }

  createHealthCollectables(collectableLayer) {
    const collectables = this.physics.add.staticGroup();
    collectableLayer.objects.forEach(item => {
      collectables.get(item.x, item.y, 'potion').setDepth(-1);
    });
    return collectables;
  }

  createEndzone({
    end
  }, player) {
    const endLevel = this.physics.add.sprite(end.x, end.y, 'end').setSize(5, 200).setAlpha(0);
    const EOL = this.physics.add.overlap(player, endLevel, () => {
      EOL.active = false;
      this.scene.start('GameOver', {
        hp: this.playerHp
      });
    });
  }

  createPlayer({
    start
  }) {
    return new Player(this, start.x, start.y);
  }

  createEnemies(spawns) {
    return spawns.objects.map(positionSpawn => new Enemy(this, positionSpawn.x, positionSpawn.y));
  }

  createPlayerColliders(player, {
    colliders
  }) {
    player.addCollider(colliders.mapColliders);
    player.addCollider(colliders.propsColliders);
    player.addCollider(colliders.bookshelfColliders);
    player.addOverlap(colliders.collectables, this.onCollect, this);
    player.addOverlap(colliders.collectableHealth, this.onHealth, this);
  }

  createEnemyColliders(enemies, {
    colliders
  }) {
    enemies.forEach(enemy => {
      enemy.addCollider(colliders.player, this.changeScene, this);
    });
  }

  addTween(collectableGroup) {
    collectableGroup.children.entries.forEach(colect => {
      this.tweens.add({
        targets: colect,
        y: colect.y - 3,
        yoyo: true,
        duration: Phaser.Math.Between(300, 550),
        ease: 'linear',
        repeat: -1,
      });
    });
  }

  startScene() {
    this.physics.resume();
  }

  listenToEvents() {
    if (this.pauseEvent) {
      return;
    }

    this.pauseEvent = this.events.on('resume', () => {
      const a = this.scene.get('FightScene');
      this.playerHp = a.hpPlayer;
      this.healthUpdate.decrease(this.playerHp);
      this.timedEvent = this.time.addEvent({
        callback: this.startScene,
        callbackScope: this,
      });
    });
  }

  changeScene(entitty) {
    this.physics.pause();
    this.scene.pause();
    entitty.disableBody(true, true);
    this.cameras.main.fadeIn(1000);
    this.scene.launch('FightScene', {
      hp: this.playerHp
    });
  }

  onHealth(entitty, collectable) {
    collectable.disableBody(true, true);
    if (this.playerHp < 70) {
      this.playerHp += 30;
    } else {
      this.playerHp = 100;
    }
    this.healthUpdate.decrease(this.playerHp);
  }

  onCollect(entitty, collectable) {
    collectable.disableBody(true, true);
    this.initialScore += 10;
    localStorage.setItem('user', `${this.initialScore}`);
    this.hud.updateScoreBoard(this.initialScore);
  }

  createCamera(player, map) {
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.zoomY = 5;
    camera.zoomX = 5;
    camera.fadeIn(2000);
  }
}

export default GameScene;