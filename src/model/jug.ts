import Gallons, { PositiveGallons } from './volume';

export default class Jug {
  constructor(public name: string, public capacity: PositiveGallons, public volumeFilled = new Gallons(0)) {

  }

  fill(): void {
    this.volumeFilled = this.capacity;
  }

  add(amountToAdd: Gallons): void {
    this.volumeFilled = this.volumeFilled.plus(amountToAdd);
  }

  remove(amountToRemove: Gallons): void {
    this.volumeFilled = this.volumeFilled.minus(amountToRemove);
  }

  empty(): void {
    this.volumeFilled = new Gallons(0);
  }

  transferContentTo(otherJug: Jug): Gallons {
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

  filledContentFitsCompletelyIn(other: Jug): boolean {
    return this.volumeFilled.isLowerOrEqualThan(other.remainingToFill());
  }

  remainingToFill(): Gallons {
    return this.capacity.minus(this.volumeFilled);
  }

  hasLessOrEqualCapacityThan(other: Jug): boolean {
    return this.capacity.isLowerOrEqualThan(other.capacity);
  }

  hasGreaterCapacityThan(other: Jug): boolean {
    return this.capacity.isHigherThan(other.capacity);
  }

  hasCapacity(targetVolume: Gallons): boolean {
    return this.capacity.isEqualTo(targetVolume);
  }

  capacityDifferenceWith(otherVolume: Gallons): Gallons {
    return this.capacity.differenceWith(otherVolume);
  }

  clone(): Jug {
    return new Jug(this.name, this.capacity, this.volumeFilled);
  }

  cloneFilledWith(volumeFilled: Gallons): Jug {
    return new Jug(this.name, this.capacity, volumeFilled);
  }

  isNotEmpty() {
    return this.volumeFilled.isHigherThan(new Gallons(0));
  }
}
