import Jug from './jug';
import Gallons, { PositiveGallons } from './volume';

export default class Jugs {
  constructor(public jugX: Jug, public jugY: Jug) {

  }

  static withCapacities(capacityX: PositiveGallons, capacityY: PositiveGallons): Jugs {
    return new Jugs(new Jug('X', capacityX), new Jug('Y', capacityY));
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
      .isLowerThan(this.biggerJugCapacityUpToTargetVolume(targetVolume))) {
      return this.smallerJug;
    } else {
      return this.biggerJug;
    }
  }

  smallerJugCapacityUpToTargetVolume(targetVolume: Gallons): Gallons {
    return this.smallerJug.capacityDifferenceWith(targetVolume);
  }

  biggerJugCapacityUpToTargetVolume(targetVolume: Gallons): Gallons {
    return this.biggerJug.capacityDifferenceWith(targetVolume);
  }

  haveAJugWithTheSameCapacityThan(targetVolume: Gallons): boolean {
    return this.jugX.capacity.isEqualTo(targetVolume) || this.jugY.capacity.isEqualTo(targetVolume);
  }

  haveAJugFilledWithVolume(targetVolume: Gallons): boolean {
    return this.jugX.volumeFilled.isEqualTo(targetVolume) || this.jugY.volumeFilled.isEqualTo(targetVolume);
  }

  allWithTheSameCapacityThan(targetVolume: Gallons): Jug[] {
    return this.all.filter(jug => jug.hasCapacity(targetVolume));
  }

  identifyJugs(jug1: Jug, jug2: Jug | undefined): { jugX: Jug, jugY: Jug } {
    if (jug1.name == this.jugX.name) {
      return {
        jugX: jug1,
        jugY: jug2 || this.jugY
      };
    } else {
      return {
        jugX: jug2 || this.jugX,
        jugY: jug1
      };
    }
  }
}
