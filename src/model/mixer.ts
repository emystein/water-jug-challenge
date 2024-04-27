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
      this.fulfillFillingAnyJug(jugs);
      return MixResult.Solved;
    }

    if (jugs.jugWithNearestCapacityTo(this.targetVolume) == jugs.smallerJug) {
      this.fulfillTransferringFromSmallerToBiggerJug(jugs);
    } else {
      this.fulfillTransferringFromBiggerToSmallerJug(jugs);
    }

    const isSolved = jugs.haveAJugFilledWithVolume(this.targetVolume);
    return isSolved ? MixResult.Solved : MixResult.NoSolution;
  }

  private fulfillFillingAnyJug(jugs: Jugs) {
    const jugsWithSameCapacityThanTargetVolume = jugs.allWithTheSameCapacityThan(this.targetVolume);
    if (jugsWithSameCapacityThanTargetVolume.length > 0) {
      this.fill(jugsWithSameCapacityThanTargetVolume[0]);
    }
  }

  private fulfillTransferringFromBiggerToSmallerJug(jugs: Jugs) {
    this.fill(jugs.biggerJug);
    while (jugs.biggerJug.volumeFilled.isHigherThan(this.targetVolume)) {
      this.empty(jugs.smallerJug);
      this.transferBetween(jugs.biggerJug, jugs.smallerJug, jugs.smallerJug.capacity);
    }
  }

  private fulfillTransferringFromSmallerToBiggerJug(jugs: Jugs) {
    let accumulatedVolume = new Gallons(0);
    while (accumulatedVolume.isLowerThan(this.targetVolume)) {
      this.fill(jugs.smallerJug);
      accumulatedVolume = accumulatedVolume.plus(jugs.smallerJug.capacity);
      this.transferBetween(jugs.smallerJug, jugs.biggerJug, accumulatedVolume);
    }
  }

  private fill(aJug: Jug): void {
    aJug.fill();
    this.logger.addEntry(new FillJug(aJug));
  }

  private empty(aJug: Jug): void {
    aJug.empty();
    this.logger.addEntry(new EmptyJug(aJug));
  }

  private transferBetween(sender: Jug, receiver: Jug, accumulatedVolume: Gallons): void {
    sender.transferContentTo(receiver);
    this.logger.addEntry(new TransferContentBetweenJugs(sender, receiver, accumulatedVolume));
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
