export default class Gallons {
  constructor(public amount: number) {
    if (amount < 0) {
      throw new IllegalVolume(amount);
    }
  }

  static positive(amount: number): PositiveGallons {
    return new PositiveGallons(amount);
  }

  isEqualTo(amountExpected: Gallons): boolean {
    return this.amount == amountExpected.amount;
  }

  isLessThan(other: Gallons): boolean {
    return this.amount < other.amount;
  }

  isLessOrEqualThan(other: Gallons): boolean {
    return this.amount <= other.amount;
  }

  isGreaterThan(other: Gallons): boolean {
    return this.amount > other.amount;
  }

  plus(amountToAdd: Gallons): Gallons {
    return new Gallons(this.amount + amountToAdd.amount);
  }

  minus(other: Gallons): Gallons {
    return new Gallons(this.amount - other.amount);
  }

  differenceWith(other: Gallons): Gallons {
    return new Gallons(Math.abs(this.amount - other.amount));
  }
}

export class IllegalVolume extends Error {
  constructor(illegalValue: number) {
    super(`Illegal Volume: ${illegalValue}`);
  }
}

export class PositiveGallons extends Gallons {
  constructor(amount: number) {
    super(amount);
    if (amount == 0) {
      throw new IllegalVolume(0);
    }
  }
}
