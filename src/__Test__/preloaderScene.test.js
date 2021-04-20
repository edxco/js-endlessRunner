import 'jest-canvas-mock';
import PreloaderScene from '../Scenes/preloaderScene';

test('PreloaderScene to be a function', () => {
  expect(typeof PreloaderScene).toBe('function');
});

test('PreloaderScene to not be undefined', () => {
  expect(typeof PreloaderScene).not.toBe('undefined');
});