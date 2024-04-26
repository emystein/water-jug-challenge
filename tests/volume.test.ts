import Gallons, { IllegalVolume } from '../src/model/volume';

describe("Gallons", () => {
  test("should not be negative", () => {
    expect(() => new Gallons(-1)).toThrow(IllegalVolume);
  });
})

describe("PositiveGallons", () => {
  test("should not be negative", () => {
    expect(() => Gallons.positive(-1)).toThrow(IllegalVolume);
  });
  test("should not be zero", () => {
    expect(() => Gallons.positive(0)).toThrow(IllegalVolume);
  });
})
