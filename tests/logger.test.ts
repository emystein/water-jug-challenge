import Gallons from '../src/model/volume';
import Jugs from '../src/model/jugs';
import MixLogger, { MixLogEntry } from '../src/model/mixLogger';
import Mixer, { MixResult } from '../src/model/mixer';
import Jug from '../src/model/jug';
import { FillJug, TransferContentBetweenJugs } from '../src/model/mixActions';

function verifyLogEntry(logEntry: MixLogEntry,
                        expectedStep: number,
                        expectedJugX: Jug,
                        expectedJugXFilledAmount: Gallons,
                        expectedJugY: Jug,
                        expectedJugYFilledAmount: Gallons,
                        expectedActionText: string,
): void {
  expect(logEntry.step).toEqual(expectedStep);
  expect(logEntry.jugX).toEqual(expectedJugX.cloneFilledWith(expectedJugXFilledAmount));
  expect(logEntry.jugY).toEqual(expectedJugY.cloneFilledWith(expectedJugYFilledAmount));
  expect(logEntry.action).toEqual(expectedActionText);
}

test('Log steps when Jug X has the same Capacity than the target Volume', () => {
  const targetVolume = new Gallons(1);
  const jugs = Jugs.withCapacities(Gallons.positive(1), Gallons.positive(1));
  const logger = new MixLogger(jugs);
  const mixer = new Mixer(logger);

  expect(mixer.mix(jugs, targetVolume)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(1);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, new Gallons(1), jugs.jugY, new Gallons(0), 'Fill Jug X');
});

test('Log steps when Jug Y has the same Capacity than the target Volume', () => {
  const targetVolume = new Gallons(1);
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(1));
  const logger = new MixLogger(jugs);
  const mixer = new Mixer(logger);

  expect(mixer.mix(jugs, targetVolume)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(1);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(1), 'Fill Jug Y');
});

test('Log steps when smaller Jug transfers to bigger Jug', () => {
  const targetVolume = new Gallons(4);
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(10));
  const logger = new MixLogger(jugs);
  const mixer = new Mixer( logger);

  expect(mixer.mix(jugs, targetVolume)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(4);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, jugs.jugX.capacity, jugs.jugY, new Gallons(0), 'Fill Jug X');
  verifyLogEntry(logger.entries[1], 2, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(2), 'Transfer from Jug X to Jug Y');
  verifyLogEntry(logger.entries[2], 3, jugs.jugX, jugs.jugX.capacity, jugs.jugY, new Gallons(2), 'Fill Jug X');
  verifyLogEntry(logger.entries[3], 4, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(4), 'Transfer from Jug X to Jug Y');
});

test('Log steps when bigger Jug transfers to smaller Jug', () => {
  const targetVolume = new Gallons(96);
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(100));
  const logger = new MixLogger(jugs);
  const mixer = new Mixer(logger);

  expect(mixer.mix(jugs, targetVolume)).toEqual(MixResult.Solved);

  expect(logger.entries.length).toEqual(5);
  verifyLogEntry(logger.entries[0], 1, jugs.jugX, new Gallons(0), jugs.jugY, jugs.jugY.capacity, 'Fill Jug Y');
  verifyLogEntry(logger.entries[1], 2, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(100), 'Empty Jug X');
  verifyLogEntry(logger.entries[2], 3, jugs.jugX, new Gallons(2), jugs.jugY, new Gallons(98), 'Transfer from Jug Y to Jug X');
  verifyLogEntry(logger.entries[3], 4, jugs.jugX, new Gallons(0), jugs.jugY, new Gallons(98), 'Empty Jug X');
  verifyLogEntry(logger.entries[4], 5, jugs.jugX, new Gallons(2), jugs.jugY, new Gallons(96), 'Transfer from Jug Y to Jug X');
});

test('Put Jug X into jugX Entry field when logging an Action triggered by Jug X', () => {
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(100));
  const logger = new MixLogger(jugs);

  logger.addEntry(new FillJug(jugs.jugX));

  expect(logger.entries[0].jugX.name).toEqual(jugs.jugX.name);
});

test('Put Jug Y into jugY Entry field when logging an Action triggered by Jug Y', () => {
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(100));
  const logger = new MixLogger(jugs);

  logger.addEntry(new FillJug(jugs.jugY));

  expect(logger.entries[0].jugY.name).toEqual(jugs.jugY.name);
});

test('Put Jug Y into jugY Entry field when logging Transfer from Jug Y to Jug X', () => {
  const jugs = Jugs.withCapacities(Gallons.positive(2), Gallons.positive(100));
  const logger = new MixLogger(jugs);

  logger.addEntry(new TransferContentBetweenJugs(jugs.jugY, jugs.jugX, Gallons.positive(10)));

  expect(logger.entries[0].jugX.name).toEqual(jugs.jugX.name);
  expect(logger.entries[0].jugY.name).toEqual(jugs.jugY.name);
});
