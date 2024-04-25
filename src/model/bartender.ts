import Gallons from './gallons.js';
import Jugs from './jugs.js';

export default class Bartender {
  constructor(public targetVolume: Gallons) {

  }

  mix(jugs: Jugs): MixResult {
    if (jugs.anyJugHasTheSameCapacityThan(this.targetVolume)) {
      return MixResult.Solved;
    }
    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;
    if (jugs.jugWithCloserCapacityTo(this.targetVolume) == smallerJug) {
      let transferredVolume = new Gallons(0);
      while (transferredVolume.isLessThan(this.targetVolume)) {
        smallerJug.fill();
        smallerJug.transferContentTo(biggerJug);
        transferredVolume = transferredVolume.plus(smallerJug.capacity);
      }
    } else {
      biggerJug.fill();
      while (biggerJug.amountFilled.isGreaterThan(this.targetVolume)) {
          smallerJug.empty();
          biggerJug.transferContentTo(smallerJug);
      }
    }
    const solved = jugs.anyJugIsFilledWithVolume(this.targetVolume);
    if (solved) {
      return MixResult.Solved;
    } else {
      return MixResult.NoSolution;
    }
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
