import MixLogger, { MixLogEntry } from '../model/mixLogger';
import Jugs from '../model/jugs';
import { PositiveGallons } from '../model/volume';
import Mixer, { MixResult } from '../model/mixer';
import Jug from '../model/jug';

export class MixService {
  constructor() {

  }

  public mix(jugXCapacity: PositiveGallons, jugYCapacity: PositiveGallons, targetVolume: PositiveGallons): MixReport {
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

  jugXIn(logEntry: MixLogEntry): Jug {
    return this.jugWithNameInLogEntry('X', logEntry);
  }

  jugYIn(logEntry: MixLogEntry): Jug {
    return this.jugWithNameInLogEntry('Y', logEntry);
  }

  jugWithNameInLogEntry(name: string, logEntry: MixLogEntry): Jug {
    return logEntry.triggeringJug.name == name ? logEntry.triggeringJug : logEntry.otherJug;
  }
}

export type MixReportRow = {
  step: number;
  jugX: number;
  jugY: number;
  action: string;
}
