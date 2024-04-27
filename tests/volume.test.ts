import Gallons, { IllegalVolume } from '../src/model/volume';

describe('Gallons', () => {
  const twoGallons = new Gallons(2);
  const eightGallons = new Gallons(8);
  const tenGallons = new Gallons(10);
  const twelveGallons = new Gallons(12);

  test('should not be negative', () => {
    expect(() => new Gallons(-1)).toThrow(IllegalVolume);
  });

  test('equal volumes', () => {
    expect(tenGallons.isEqualTo(tenGallons)).toBe(true);
  });

  test('different volumes', () => {
    expect(twoGallons.isEqualTo(tenGallons)).toBe(false);
  });

  test('is lower than a higher volume', () => {
    expect(twoGallons.isLowerThan(tenGallons)).toBe(true);
  });

  test('is not lower than a lower volume', () => {
    expect(tenGallons.isLowerThan(twoGallons)).toBe(false);
  });

  test('is lower or equal than a higher volume', () => {
    expect(twoGallons.isLowerOrEqualThan(tenGallons)).toBe(true);
  });

  test('is not lower or equal than a lower volume', () => {
    expect(tenGallons.isLowerOrEqualThan(twoGallons)).toBe(false);
  });

  test('is higher than a lower volume', () => {
    expect(tenGallons.isHigherThan(twoGallons)).toBe(true);
  });

  test('is not higher than a higher volume', () => {
    expect(twoGallons.isHigherThan(tenGallons)).toBe(false);
  });

  test('plus', () => {
    expect(tenGallons.plus(twoGallons)).toEqual(twelveGallons);
  });

  test('minus', () => {
    expect(twelveGallons.minus(twoGallons)).toEqual(tenGallons);
  });

  test('difference with a lower volume', () => {
    expect(tenGallons.differenceWith(twoGallons)).toEqual(eightGallons);
  });

  test('difference with a higher volume', () => {
    expect(twoGallons.differenceWith(tenGallons)).toEqual(eightGallons);
  });
});

describe('PositiveGallons', () => {
  test('should not be negative', () => {
    expect(() => Gallons.positive(-1)).toThrow(IllegalVolume);
  });
  test('should not be zero', () => {
    expect(() => Gallons.positive(0)).toThrow(IllegalVolume);
  });
});
