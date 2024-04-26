import MixLogger, { MixLogEntry } from '../model/mixLogger.js';
import Jugs from '../model/jugs.js';
import { PositiveGallons } from '../model/volume.js';
import Mixer, { MixResult } from '../model/mixer.js';

export default class MixService {
  constructor() {

  }

  public mix(jugXCapacity: PositiveGallons, jugYCapacity: PositiveGallons, targetVolume: PositiveGallons) {
    const jugs = Jugs.withCapacities(jugXCapacity, jugYCapacity);
    const logger = new MixLogger(jugs);
    const mixer = new Mixer(targetVolume, logger);
    const mixResult = mixer.mix(jugs);
    return new MixReport(mixResult, logger);
  }
}

export class MixReport {
  public status: string;
  public solution: MixReportRow[] = [];

  constructor(mixResult: MixResult, logger: MixLogger) {
    this.status = mixResult == MixResult.Solved ? 'Solved' : 'No Solution';
    if (mixResult == MixResult.Solved) {
      this.solution = logger.entries.map(logEntry => {
        return {
          step: logEntry.step,
          jugX: this.jugXIn(logEntry).volumeFilled.amount,
          jugY: this.jugYIn(logEntry).volumeFilled.amount,
          action: logEntry.action,
        } as MixReportRow;
      });
    }
  }

  jugXIn(logEntry: MixLogEntry) {
    return this.jugWithNameInLogEntry('X', logEntry);
  }

  jugYIn(logEntry: MixLogEntry) {
    return this.jugWithNameInLogEntry('Y', logEntry);
  }

  jugWithNameInLogEntry(name: string, logEntry: MixLogEntry) {
    return logEntry.triggeringJug.name == name ? logEntry.triggeringJug : logEntry.otherJug;
  }
}

export type MixReportRow = {
  step: number;
  jugX: number;
  jugY: number;
  action: string;
}
