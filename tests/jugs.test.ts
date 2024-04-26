import Jugs from '../src/model/jugs';
import Gallons, { IllegalVolume } from '../src/model/volume';

describe('Jugs', () => {
  test('Illegal Jug X capacity', () => {
    expect(() => Jugs.withCapacities(new Gallons(-1), Gallons.positive(1))).toThrow(IllegalVolume);
  });
  test('Illegal Jug Y capacity', () => {
    expect(() => Jugs.withCapacities(Gallons.positive(1), new Gallons(-1))).toThrow(IllegalVolume);
  });
})
