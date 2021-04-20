import 'jest-canvas-mock';
import GameScene from '../Scenes/gameScene';

test('Gamescene is a funtion', () => {
  expect(typeof GameScene).toBe('function');
});

test('GameScene is not undefined', () => {
  expect(typeof GameScene).not.toBe('undefined');
});