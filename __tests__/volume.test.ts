import Gallons, { IllegalVolume, PositiveGallons } from '../src/model/volume.js';

describe("Gallons", () => {
  test("should not be negative", () => {
    expect(() => new Gallons(-1)).toThrow(IllegalVolume);
  });
})

describe("PositiveGallons", () => {
  test("should not be negative", () => {
    expect(() => new PositiveGallons(-1)).toThrow(IllegalVolume);
  });
  test("should not be zero", () => {
    expect(() => new PositiveGallons(0)).toThrow(IllegalVolume);
  });
})
