import Gallons, { IllegalVolume } from '../src/model/volume.js';

describe("Gallons", () => {
  test("should not be negative", () => {
    expect(() => new Gallons(-1)).toThrow(IllegalVolume);
  });
})
