import Gallons, { PositiveGallons } from './volume';
import Jugs from './jugs';
import MixLogger from './mixLogger';
import { EmptyJug, FillJug, TransferContentBetweenJugs } from './mixActions';
import Jug from './jug';

export default class Mixer {
  constructor(public targetVolume: PositiveGallons, private logger: MixLogger) {
  }

  mix(jugs: Jugs): MixResult {
    if (jugs.haveAJugWithTheSameCapacityThan(this.targetVolume)) {
      const fillingJug = jugs.allWithTheSameCapacityThan(this.targetVolume)[0];
      this.fill(fillingJug);
      return MixResult.Solved;
    }

    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;

    if (jugs.jugWithNearestCapacityTo(this.targetVolume) == smallerJug) {
      let accumulatedVolume = new Gallons(0);
      while (accumulatedVolume.isLessThan(this.targetVolume)) {
        this.fill(smallerJug);
        accumulatedVolume = accumulatedVolume.plus(smallerJug.capacity);
        this.transferBetween(smallerJug, biggerJug, accumulatedVolume);
      }
    } else {
      this.fill(biggerJug);
      while (biggerJug.volumeFilled.isGreaterThan(this.targetVolume)) {
        this.empty(smallerJug);
        this.transferBetween(biggerJug, smallerJug, smallerJug.capacity);
      }
    }

    const isSolved = jugs.haveAJugFilledWithVolume(this.targetVolume);
    return isSolved ? MixResult.Solved : MixResult.NoSolution;
  }

  fill(aJug: Jug): void {
    aJug.fill();
    this.logger.addEntry(new FillJug(aJug));
  }

  empty(aJug: Jug): void {
    aJug.empty();
    this.logger.addEntry(new EmptyJug(aJug));
  }

  transferBetween(sender: Jug, receiver: Jug, accumulatedVolume: Gallons): void {
    sender.transferContentTo(receiver);
    this.logger.addEntry(new TransferContentBetweenJugs(sender, receiver, accumulatedVolume));
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
