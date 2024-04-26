import Gallons from './gallons.js';
import Jugs from './jugs.js';
import MixLogger from './mixLogger.js';
import { EmptyJug, FillJug, TransferContentBetweenJugs } from './mixActions.js';

export default class Mixer {
  constructor(public targetVolume: Gallons, private logger: MixLogger) {
  }

  mix(jugs: Jugs): MixResult {
    if (jugs.haveAJugWithTheSameCapacityThan(this.targetVolume)) {
      const fillingJug = jugs.allWithTheSameCapacityThan(this.targetVolume)[0];
      fillingJug.fill();
      this.logger.addEntry(new FillJug(fillingJug));
      return MixResult.Solved;
    }

    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;

    if (jugs.jugWithNearestCapacityTo(this.targetVolume) == smallerJug) {
      let transferredVolume = new Gallons(0);
      while (transferredVolume.isLessThan(this.targetVolume)) {
        smallerJug.fill();
        this.logger.addEntry(new FillJug(smallerJug));
        smallerJug.transferContentTo(biggerJug);
        transferredVolume = transferredVolume.plus(smallerJug.capacity);
        this.logger.addEntry(new TransferContentBetweenJugs(smallerJug, biggerJug, transferredVolume));
      }
    } else {
      biggerJug.fill();
      this.logger.addEntry(new FillJug(biggerJug));
      while (biggerJug.volumeFilled.isGreaterThan(this.targetVolume)) {
        smallerJug.empty();
        this.logger.addEntry(new EmptyJug(smallerJug));
        biggerJug.transferContentTo(smallerJug);
        this.logger.addEntry(new TransferContentBetweenJugs(biggerJug, smallerJug, smallerJug.capacity));
      }
    }

    const isSolved = jugs.haveAJugFilledWithVolume(this.targetVolume);
    return isSolved ? MixResult.Solved : MixResult.NoSolution;
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
