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

    bartender.fill(jugX);

    expect(bartender.solved()).toBeTruthy();
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

    bartender.fill(jugY);

    expect(bartender.solved()).toBeTruthy();
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

    for (let i: number = 0; i < (expectedAmount - jugXCapacity); i = i + jugXCapacity) {
      bartender.fill(jugX);
      expect(bartender.solved()).toBeFalsy();
      bartender.transfer(jugX, jugY);
      expect(bartender.solved()).toBeFalsy();
    }

    bartender.fill(jugX);
    expect(bartender.solved()).toBeFalsy();
    bartender.transfer(jugX, jugY);
    expect(bartender.solved()).toBeTruthy();
    expect(jugY.amountFilled).toEqual(expectedGallons);
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

    for (let i: number = 0; i < (expectedAmount - jugYCapacity); i = i + jugYCapacity) {
      bartender.fill(jugY);
      expect(bartender.solved()).toBeFalsy();
      bartender.transfer(jugY, jugX);
      expect(bartender.solved()).toBeFalsy();
    }

    bartender.fill(jugY);
    expect(bartender.solved()).toBeFalsy();
    bartender.transfer(jugY, jugX);
    expect(bartender.solved()).toBeTruthy();
    expect(jugX.amountFilled).toEqual(expectedGallons);
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

    bartender.fill(jugY);
    expect(bartender.solved()).toBeFalsy();

    for (let i: number = jugYCapacity; i > expectedAmount; i = i - jugXCapacity) {
      bartender.transfer(jugY, jugX);
      bartender.empty(jugX);
    }

    expect(bartender.solved()).toBeTruthy();
    expect(jugY.amountFilled).toEqual(expectedGallons);
  })
});
