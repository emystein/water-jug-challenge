import Jug from './jug.js';
import Gallons from './gallons.js';

export default class Bartender {
  constructor(public targetVolume: Gallons, public jugX: Jug, public jugY: Jug) {

  }

  get smallerJug() {
    return this.jugX.hasLessOrEqualCapacityThanJug(this.jugY) ? this.jugX : this.jugY;
  }

  get biggerJug() {
    return this.jugX.hasGreaterCapacityThanJug(this.jugY) ? this.jugX : this.jugY;
  }

  mix() {
    const smallerJug = this.smallerJug;
    const biggerJug = this.biggerJug;
    if (this.jugWithCloserCapacityToExpectedAmount() == smallerJug) {
      for (let i: number = 0; i < (this.targetVolume.amount - smallerJug.capacity.amount); i = i + smallerJug.capacity.amount) {
        this.fill(smallerJug);
        this.transfer(smallerJug, biggerJug);
      }
      this.fill(smallerJug);
      this.transfer(smallerJug, biggerJug);
    } else {
      this.fill(biggerJug);
      for (let i: number = biggerJug.capacity.amount; i > this.targetVolume.amount; i = i - smallerJug.capacity.amount) {
        this.transfer(biggerJug, smallerJug);
        this.empty(smallerJug);
      }
    }
    return this.solved();
  }

  fill(jug: Jug) {
    jug.fill();
  }

  transfer(jugA: Jug, jugB: Jug) {
    if (jugA.filledContentFitsCompletelyIn(jugB)) {
      jugB.add(jugA.capacity);
      jugA.empty();
    } else {
      const amountToTransfer = jugB.remainingToFill();
      jugB.add(amountToTransfer);
      jugA.remove(amountToTransfer);
    }
  }

  empty(aJug: Jug) {
    aJug.empty();
  }

  solved() {
    return this.jugX.amountFilled.isEqualTo(this.targetVolume) || this.jugY.amountFilled.isEqualTo(this.targetVolume);
  }

  private jugWithCloserCapacityToExpectedAmount() {
    if (this.smallerJugCapacityUpToTargetVolume()
      .isLessThan(this.biggerJugCapacityUpToTargetVolume())) {
      return this.smallerJug;
    } else {
      return this.biggerJug;
    }
  }

  private smallerJugCapacityUpToTargetVolume() {
    return this.smallerJug.capacityUpTo(this.targetVolume);
  }

  private biggerJugCapacityUpToTargetVolume() {
    return this.biggerJug.capacityUpTo(this.targetVolume);
  }
}
