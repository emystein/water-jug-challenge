import Jug from './jug.js';
import Gallons from './gallons.js';

export default class Bartender {
  constructor(public expectedAmount: Gallons, public jugX: Jug, public jugY: Jug) {

  }

  mix() {
    const lowerCapacityJug = this.jugX.hasLessOrEqualCapacityThanJug(this.jugY) ? this.jugX : this.jugY;
    const higherCapacityJug = this.otherJugThan(lowerCapacityJug);
    if (lowerCapacityJug.capacity.isEqualTo(this.expectedAmount)) {
      lowerCapacityJug.fill();
      return;
    }
    if (higherCapacityJug.capacity.isEqualTo(this.expectedAmount)) {
      higherCapacityJug.fill();
      return;
    }
    if (lowerCapacityJug.hasLessOrEqualCapacityThanAmount(this.expectedAmount) &&
      higherCapacityJug.hasMoreOrEqualCapacityThanAmount(this.expectedAmount)) {
      const transferFromLowerToHigherCapacityJug = Math.abs(lowerCapacityJug.capacity.amount - this.expectedAmount.amount) < Math.abs(higherCapacityJug.capacity.amount - this.expectedAmount.amount);
      if (transferFromLowerToHigherCapacityJug) {
        for (let i: number = 0; i < (this.expectedAmount.amount - lowerCapacityJug.capacity.amount); i = i + lowerCapacityJug.capacity.amount) {
          this.fill(lowerCapacityJug);
          this.transfer(lowerCapacityJug, higherCapacityJug);
        }
        this.fill(lowerCapacityJug);
        this.transfer(lowerCapacityJug, higherCapacityJug);
        return;
      } else {
        this.fill(higherCapacityJug);
        for (let i: number = higherCapacityJug.capacity.amount; i > this.expectedAmount.amount; i = i - lowerCapacityJug.capacity.amount) {
          this.transfer(higherCapacityJug, lowerCapacityJug);
          this.empty(lowerCapacityJug);
        }
      }
    }
  }

  solved() {
    return this.jugX.amountFilled.isEqualTo(this.expectedAmount) || this.jugY.amountFilled.isEqualTo(this.expectedAmount);
  }

  fill(jug: Jug) {
    jug.fill()
  }

  transfer(jugA: Jug, jugB: Jug) {
    if (jugA.filledContentFitsCompletelyIn(jugB)) {
      jugB.add(jugA.capacity);
      jugA.empty();
    } else {
      const amountToTransfer = jugB.remainingToFill()
      jugB.add(amountToTransfer);
      jugA.remove(amountToTransfer);
    }
  }

  empty(aJug: Jug) {
    aJug.empty();
  }

  private otherJugThan(checked: Jug) {
    return checked == this.jugX ? this.jugY : this.jugX
  }
}

