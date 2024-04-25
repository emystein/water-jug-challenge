import Jug from './jug.js';
import Gallons from './gallons.js';

export default class Jugs {
  constructor(public jugX: Jug, public jugY: Jug) {

  }

  static withCapacities(capacityX: Gallons, capacityY: Gallons) {
    return new Jugs(new Jug("X", capacityX), new Jug("Y", capacityY));
  }

  get all() {
    return [this.jugX, this.jugY];
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

  anyJugHasTheSameCapacityThan(targetVolume: Gallons) {
    return this.jugX.capacity.isEqualTo(targetVolume) || this.jugY.capacity.isEqualTo(targetVolume);
  }

  anyJugIsFilledWithVolume(targetVolume: Gallons) {
    return this.jugX.amountFilled.isEqualTo(targetVolume) || this.jugY.amountFilled.isEqualTo(targetVolume);
  }

  otherJugThan(jug: Jug) {
    return jug == this.jugX ? this.jugY : this.jugX;
  }

  jugsWithTheSameCapacityThan(targetVolume: Gallons) {
    return this.all.filter(jug => jug.hasCapacity(targetVolume));
  }
}
