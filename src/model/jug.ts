import Gallons from './gallons.js';

export default class Jug {
  constructor(public name: string, public capacity: Gallons, public amountFilled = new Gallons(0)) {

  }

  fill() {
    this.amountFilled = this.capacity;
  }

  add(amountToAdd: Gallons) {
    this.amountFilled = this.amountFilled.plus(amountToAdd);
  }

  remove(amountToRemove: Gallons) {
    this.amountFilled = this.amountFilled.minus(amountToRemove);
  }

  empty() {
    this.amountFilled = new Gallons(0);
  }

  transferContentTo(otherJug: Jug) {
    if (this.filledContentFitsCompletelyIn(otherJug)) {
      otherJug.add(this.capacity);
      this.empty();
      return this.capacity;
    } else {
      const amountToTransfer = otherJug.remainingToFill();
      otherJug.add(amountToTransfer);
      this.remove(amountToTransfer);
      return amountToTransfer;
    }
  }

  filledContentFitsCompletelyIn(other: Jug) {
    return this.amountFilled.isLessOrEqualThan(other.remainingToFill());
  }

  remainingToFill() {
    return this.capacity.minus(this.amountFilled);
  }

  hasLessOrEqualCapacityThanJug(other: Jug) {
    return this.capacity.isLessOrEqualThan(other.capacity);
  }

  hasGreaterCapacityThanJug(other: Jug) {
    return this.capacity.isGreaterThan(other.capacity);
  }

  hasCapacity(targetVolume: Gallons) {
    return this.capacity.isEqualTo(targetVolume);
  }

  capacityUpTo(otherVolume: Gallons) {
    return this.capacity.differenceWith(otherVolume);
  }

  isNotEmpty() {
    return this.amountFilled.isGreaterThan(new Gallons(0));
  }

  cloneFilledWith(volumeFilled: Gallons) {
    return new Jug(this.name, this.capacity, volumeFilled);
  }
}
