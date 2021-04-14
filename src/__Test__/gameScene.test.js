import 'jest-canvas-mock';
import GameScene from '../Scenes/gameScene';

const testGame = new GameScene();

test('Gamescene is a funtion', () => {
  expect(typeof GameScene).toBe('function');
});

test('GameScene is not undefined', () => {
  expect(typeof GameScene).not.toBe('undefined');
});