import Gallons from '../src/model/gallons.js';
import Jug from '../src/model/jug.js';
import Bartender from '../src/model/bartender.js';

describe('Jug X has the same Capacity than the expected Amount', () => {
  it.each([
    [1, 1, 1],
    [1, 1, 2],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal. Fill Jug X', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  });

});

describe('Jug Y has the same Capacity than the expected Amount', () => {
  it.each([
    [1, 1, 1],
    [1, 2, 1],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal. Fill Jug Y', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  });
});

describe('Jug X has less Capacity than the expected Amount, Jug Y has sufficient Capacity to fill the expected Amount', () => {
  it.each([
    [2, 1, 2],
    [4, 1, 4],
    [6, 2, 6],
    [8, 2, 10],
    [96, 2, 100]
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  });
});

describe('Jug Y has less Capacity than the expected Amount, Jug X has sufficient Capacity to fill the expected Amount', () => {
  it.each([
    [2, 2, 1],
    [4, 4, 1],
    [6, 6, 2],
    [8, 10, 2],
    [96, 100, 2]
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  });
});

describe('Jug X has less capacity than the expected Amount, Jug Y has more capacity than the expected Amount', () => {
  it.each([
    [2, 1, 4],
    [6, 2, 8],
    [8, 2, 10],
    [96, 2, 100]
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  })
});

describe('Jug Y has less capacity than the expected Amount, Jug X has more capacity than the expected Amount', () => {
  it.each([
    [2, 4, 1],
    [6, 8, 2],
    [8, 10, 2],
    [96, 100, 2]
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeTruthy();
  })
});

describe('No solution', () => {
  it.each([
    [2, 6, 5],
    [2, 6, 6],
    [2, 6, 10],
    [2, 10, 6],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugX = Jug.withCapacity(new Gallons(jugXCapacity));
    const jugY = Jug.withCapacity(new Gallons(jugYCapacity));
    const bartender = new Bartender(expectedGallons, jugX, jugY);
    expect(bartender.mix()).toBeFalsy();
  });
});
