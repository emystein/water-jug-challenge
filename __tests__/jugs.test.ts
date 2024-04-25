import Gallons from '../src/model/gallons.js';
import Bartender from '../src/model/bartender.js';
import Jugs from '../src/model/jugs.js';

describe('Any of the Jugs has the same Capacity than the target Volume', () => {
  it.each([
    [1, 1, 1],
    [1, 1, 2],
    [1, 2, 1],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal. Fill Jug X', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const bartender = new Bartender(expectedGallons);
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    expect(bartender.mix(jugs)).toBeTruthy();
  });
});

describe('One of the Jugs has less Capacity than the target Volume, the other Jug has sufficient Capacity to fill the target Volume', () => {
  it.each([
    [2, 1, 2],
    [2, 1, 4],
    [6, 2, 6],
    [6, 2, 8],
    [8, 2, 10],
    [96, 2, 100],
    [2, 2, 1],
    [2, 4, 1],
    [6, 6, 2],
    [6, 8, 2],
    [8, 10, 2],
    [96, 100, 2],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const bartender = new Bartender(expectedGallons);
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    expect(bartender.mix(jugs)).toBeTruthy();
  });
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
    const bartender = new Bartender(expectedGallons);
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    expect(bartender.mix(jugs)).toBeFalsy();
  });
});
