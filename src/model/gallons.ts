export default class Gallons {
  constructor(public amount: number) {

  }

  isEqualTo(amountExpected: Gallons) {
    return this.amount == amountExpected.amount;
  }

  plus(amountToAdd: Gallons) {
    return new Gallons(this.amount + amountToAdd.amount);
  }

  isLessOrEqualThan(other: Gallons) {
    return this.amount <= other.amount;
  }

  minus(other: Gallons) {
    return new Gallons(this.amount - other.amount)
  }
}
