import Gallons from './gallons.js';

export default class Jug {
  public amountFilled: Gallons;

  constructor(public capacity: Gallons) {
    this.amountFilled = new Gallons(0);
  }

  static withCapacity(capacity: Gallons) {
    return new Jug(capacity);
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

  filledContentFitsCompletelyIn(other: Jug) {
    return this.amountFilled.isLessOrEqualThan(other.remainingToFill());
  }

  remainingToFill() {
    return this.capacity.minus(this.amountFilled);
  }

}
