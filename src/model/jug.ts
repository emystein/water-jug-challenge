import Gallons from './gallons.js';

export default class Jug {
  constructor(public name: string, public capacity: Gallons, public volumeFilled = new Gallons(0)) {

  }

  fill() {
    this.volumeFilled = this.capacity;
  }

  add(amountToAdd: Gallons) {
    this.volumeFilled = this.volumeFilled.plus(amountToAdd);
  }

  remove(amountToRemove: Gallons) {
    this.volumeFilled = this.volumeFilled.minus(amountToRemove);
  }

  empty() {
    this.volumeFilled = new Gallons(0);
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
    return this.volumeFilled.isLessOrEqualThan(other.remainingToFill());
  }

  remainingToFill() {
    return this.capacity.minus(this.volumeFilled);
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
    return this.volumeFilled.isGreaterThan(new Gallons(0));
  }

  clone() {
    return new Jug(this.name, this.capacity, this.volumeFilled);
  }

  cloneFilledWith(volumeFilled: Gallons) {
    return new Jug(this.name, this.capacity, volumeFilled);
  }
}
