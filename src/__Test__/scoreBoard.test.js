import 'jest-canvas-mock';
import Scoreboard from '../Scenes/scoreBoard';

const testGame = new Scoreboard();

test('Scoreboard to be a function', () => {
  expect(typeof Scoreboard).toBe('function');
});

test('Scoreboard to not be undefined', () => {
  expect(typeof Scoreboard).not.toBe('undefined');
});

test('Scoreboard have property createScore', () => {
  expect(testGame).toHaveProperty('createScore');
});

test('Scoreboard do not have property drawScore', () => {
  expect(testGame).not.toHaveProperty('drawScore');
});