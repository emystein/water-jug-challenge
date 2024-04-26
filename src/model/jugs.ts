import Jug from './jug.js';
import Gallons, { PositiveGallons } from './volume.js';

export default class Jugs {
  constructor(public jugX: Jug, public jugY: Jug) {

  }

  static withCapacities(capacityX: PositiveGallons, capacityY: PositiveGallons): Jugs {
    return new Jugs(new Jug("X", capacityX), new Jug("Y", capacityY));
  }

  get all(): Jug[] {
    return [this.jugX, this.jugY];
  }

  get smallerJug(): Jug {
    return this.jugX.hasLessOrEqualCapacityThan(this.jugY) ? this.jugX : this.jugY;
  }

  get biggerJug(): Jug {
    return this.jugX.hasGreaterCapacityThan(this.jugY) ? this.jugX : this.jugY;
  }

  jugWithNearestCapacityTo(targetVolume: Gallons): Jug {
    if (this.smallerJugCapacityUpToTargetVolume(targetVolume)
      .isLessThan(this.biggerJugCapacityUpToTargetVolume(targetVolume))) {
      return this.smallerJug;
    } else {
      return this.biggerJug;
    }
  }

  smallerJugCapacityUpToTargetVolume(targetVolume: Gallons): Gallons {
    return this.smallerJug.capacityUpTo(targetVolume);
  }

  biggerJugCapacityUpToTargetVolume(targetVolume: Gallons): Gallons {
    return this.biggerJug.capacityUpTo(targetVolume);
  }

  haveAJugWithTheSameCapacityThan(targetVolume: Gallons): boolean {
    return this.jugX.capacity.isEqualTo(targetVolume) || this.jugY.capacity.isEqualTo(targetVolume);
  }

  haveAJugFilledWithVolume(targetVolume: Gallons): boolean {
    return this.jugX.volumeFilled.isEqualTo(targetVolume) || this.jugY.volumeFilled.isEqualTo(targetVolume);
  }

  otherJugThan(jug: Jug): Jug {
    return jug.name == this.jugX.name ? this.jugY : this.jugX;
  }

  allWithTheSameCapacityThan(targetVolume: Gallons): Jug[] {
    return this.all.filter(jug => jug.hasCapacity(targetVolume));
  }
}
