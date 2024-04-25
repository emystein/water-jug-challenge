import Jug from './jug.js';
import Gallons from './gallons.js';

export default class Jugs {
  constructor(public jugX: Jug, public jugY: Jug) {

  }

  get smallerJug() {
    return this.jugX.hasLessOrEqualCapacityThanJug(this.jugY) ? this.jugX : this.jugY;
  }

  get biggerJug() {
    return this.jugX.hasGreaterCapacityThanJug(this.jugY) ? this.jugX : this.jugY;
  }

  jugWithCloserCapacityTo(targetVolume: Gallons) {
    if (this.smallerJugCapacityUpToTargetVolume(targetVolume)
      .isLessThan(this.biggerJugCapacityUpToTargetVolume(targetVolume))) {
      return this.smallerJug;
    } else {
      return this.biggerJug;
    }
  }

  smallerJugCapacityUpToTargetVolume(targetVolume: Gallons) {
    return this.smallerJug.capacityUpTo(targetVolume);
  }

  biggerJugCapacityUpToTargetVolume(targetVolume: Gallons) {
    return this.biggerJug.capacityUpTo(targetVolume);
  }

  anyJugIsFilledWithVolume(targetVolume: Gallons) {
    return this.jugX.amountFilled.isEqualTo(targetVolume) || this.jugY.amountFilled.isEqualTo(targetVolume);
  }
}
