import Gallons from '../src/model/gallons.js';
import Jugs from '../src/model/jugs.js';
import MixLogger, { MixLogEntry } from '../src/model/mixLogger.js';
import Bartender, { MixResult } from '../src/model/bartender.js';
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

test('Log steps when smaller Jug transfers to bigger Jug', () => {
  const expectedAmount = 4;
  const expectedGallons = new Gallons(expectedAmount);
  const jugs = Jugs.withCapacities(new Gallons(2), new Gallons(10));
  const logger = new MixLogger(jugs);
  const bartender = new Bartender(expectedGallons, logger);

  expect(bartender.mix(jugs)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(4);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, jugs.jugX.capacity, jugs.jugY, new Gallons(0), 'Fill Jug X');
  verifyLogEntry(logger.entries[1], 2, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(2), 'Transfer from Jug X to Jug Y');
  verifyLogEntry(logger.entries[2], 3, jugs.jugX, jugs.jugX.capacity, jugs.jugY, new Gallons(2), 'Fill Jug X');
  verifyLogEntry(logger.entries[3], 4, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(4), 'Transfer from Jug X to Jug Y');
});

test('Log steps when bigger Jug transfers to smaller Jug', () => {
  const expectedAmount = 96;
  const expectedGallons = new Gallons(expectedAmount);
  const jugs = Jugs.withCapacities(new Gallons(2), new Gallons(100));
  const logger = new MixLogger(jugs);
  const bartender = new Bartender(expectedGallons, logger);

  expect(bartender.mix(jugs)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(5);
  verifyLogEntry(logger.entries[0], 1, jugs.jugY, jugs.jugY.capacity, jugs.jugX, new Gallons(0), 'Fill Jug Y');
  verifyLogEntry(logger.entries[1], 2, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(100), 'Empty Jug X');
  verifyLogEntry(logger.entries[2], 3, jugs.jugY, new Gallons(98), jugs.jugX, new Gallons(2), 'Transfer from Jug Y to Jug X');
  verifyLogEntry(logger.entries[3], 4, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(98), 'Empty Jug X');
  verifyLogEntry(logger.entries[4], 5, jugs.jugY, new Gallons(96), jugs.jugX, new Gallons(2), 'Transfer from Jug Y to Jug X');
});
