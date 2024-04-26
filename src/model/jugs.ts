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
    return this.jugX.hasLessOrEqualCapacityThan(this.jugY) ? this.jugX : this.jugY;
  }

  get biggerJug() {
    return this.jugX.hasGreaterCapacityThan(this.jugY) ? this.jugX : this.jugY;
  }

  jugWithNearestCapacityTo(targetVolume: Gallons) {
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

  haveAJugWithTheSameCapacityThan(targetVolume: Gallons) {
    return this.jugX.capacity.isEqualTo(targetVolume) || this.jugY.capacity.isEqualTo(targetVolume);
  }

  haveAJugFilledWithVolume(targetVolume: Gallons) {
    return this.jugX.volumeFilled.isEqualTo(targetVolume) || this.jugY.volumeFilled.isEqualTo(targetVolume);
  }

  otherJugThan(jug: Jug) {
    return jug.name == this.jugX.name ? this.jugY : this.jugX;
  }

  allWithTheSameCapacityThan(targetVolume: Gallons) {
    return this.all.filter(jug => jug.hasCapacity(targetVolume));
  }
}
