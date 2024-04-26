export default class Gallons {
  constructor(public amount: number) {
    if (amount < 0) {
      throw new IllegalVolume(amount);
    }
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

export class IllegalVolume extends Error {
  constructor(illegalValue: number) {
    super(`Illegal Volume: ${illegalValue}`);
  }
}
