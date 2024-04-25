import Gallons from './gallons.js';
import Jugs from './jugs.js';
import MixLogger from './mixLogger.js';
import Jug from './jug.js';

export class MixAction {
  constructor(public triggeringJug: Jug, public text: string) {

  }
}

export class FillJug extends MixAction {
  constructor(triggeringJug: Jug) {
    super(triggeringJug, `Fill Jug ${triggeringJug.name}`);
  }
}

export default class Bartender {
  constructor(public targetVolume: Gallons, private logger: MixLogger) {
  }

  mix(jugs: Jugs): MixResult {
    if (jugs.anyJugHasTheSameCapacityThan(this.targetVolume)) {
      const fillingJug = jugs.jugsWithTheSameCapacityThan(this.targetVolume)[0];
      fillingJug.fill();
      this.logger.addEntry(new FillJug(fillingJug));
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
