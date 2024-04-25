export default class Gallons {
  constructor(public amount: number) {

  }

  isEqualTo(amountExpected: Gallons) {
    return this.amount == amountExpected.amount;
  }

  isLessThan(other: Gallons) {
    return this.amount < other.amount;
  }

  isLessOrEqualThan(other: Gallons) {
    return this.amount <= other.amount;
  }

  isGreaterThan(other: Gallons) {
    return this.amount > other.amount;
  }

  isGreaterOrEqualThan(other: Gallons) {
    return this.amount >= other.amount;
  }

  plus(amountToAdd: Gallons) {
    return new Gallons(this.amount + amountToAdd.amount);
  }

  minus(other: Gallons) {
    return new Gallons(this.amount - other.amount);
  }

  differenceWith(other: Gallons) {
    return new Gallons(Math.abs(this.minus(other).amount));
  }
}
