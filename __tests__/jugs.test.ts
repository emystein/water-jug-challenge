import Gallons from '../src/model/gallons.js';
import Bartender, { MixResult } from '../src/model/bartender.js';
import Jugs from '../src/model/jugs.js';
import MixLogger, { MixLogEntry } from '../src/model/mixLogger.js';
import Jug from '../src/model/jug.js';

function verifyLogEntry(logEntry: MixLogEntry,
                        expectedStep: number,
                        expectedJugX: Jug,
                        expectedJugXFilledAmount: Gallons,
                        expectedJugY: Jug,
                        expectedJugYFilledAmount: Gallons,
                        expectedActionText: string,
) {
  expect(logEntry.step).toEqual(expectedStep);
  expect(logEntry.triggeringJug).toEqual(expectedJugX.cloneFilledWith(expectedJugXFilledAmount));
  expect(logEntry.otherJug).toEqual(expectedJugY.cloneFilledWith(expectedJugYFilledAmount));
  expect(logEntry.action).toEqual(expectedActionText);
}

describe('Any of the Jugs has the same Capacity than the target Volume', () => {
  it.each([
    [1, 1, 1],
    [1, 1, 2],
    [1, 2, 1],
  ])
  ('Expected: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal. Fill Jug X', (expectedAmount: number, jugXCapacity: number, jugYCapacity: number) => {
    const expectedGallons = new Gallons(expectedAmount);
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    const logger = new MixLogger(jugs);
    const bartender = new Bartender(expectedGallons, logger);
    expect(bartender.mix(jugs)).toEqual(MixResult.Solved);
  });
});

test('Log steps when Jug X has the same Capacity than the target Volume', () => {
  const expectedAmount = 1;
  const expectedGallons = new Gallons(expectedAmount);
  const jugs = Jugs.withCapacities(new Gallons(1), new Gallons(1));
  const logger = new MixLogger(jugs);
  const bartender = new Bartender(expectedGallons, logger);

  expect(bartender.mix(jugs)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(1);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, new Gallons(1), jugs.jugY, new Gallons(0), 'Fill Jug X');
});

test('Log steps when Jug Y has the same Capacity than the target Volume', () => {
  const expectedAmount = 1;
  const expectedGallons = new Gallons(expectedAmount);
  const jugs = Jugs.withCapacities(new Gallons(2), new Gallons(1));
  const logger = new MixLogger(jugs);
  const bartender = new Bartender(expectedGallons, logger);

  expect(bartender.mix(jugs)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(1);
  verifyLogEntry(logger.entries[0], 1, jugs.jugY, new Gallons(1), jugs.jugX, new Gallons(0), 'Fill Jug Y');
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
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    const logger = new MixLogger(jugs);
    const bartender = new Bartender(expectedGallons, logger);
    expect(bartender.mix(jugs)).toEqual(MixResult.Solved);
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
    const jugs = Jugs.withCapacities(new Gallons(jugXCapacity), new Gallons(jugYCapacity));
    const logger = new MixLogger(jugs);
    const bartender = new Bartender(expectedGallons, logger);
    expect(bartender.mix(jugs)).toEqual(MixResult.NoSolution);
  });
});
