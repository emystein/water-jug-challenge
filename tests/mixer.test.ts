import Gallons from '../src/model/volume';
import Mixer, { MixResult } from '../src/model/mixer';
import Jugs from '../src/model/jugs';
import MixLogger from '../src/model/mixLogger';

function mix(jugXCapacity: number, jugYCapacity: number, targetVolume: number): MixResult {
  const jugs = Jugs.withCapacities(Gallons.positive(jugXCapacity), Gallons.positive(jugYCapacity));
  const mixer = new Mixer(Gallons.positive(targetVolume), new MixLogger(jugs));
  return mixer.mix(jugs);
}

describe('Any of the Jugs has the same Capacity than the target Volume', () => {
  it.each([
    [1, 1, 1],
    [1, 1, 2],
    [1, 2, 1],
  ])
  ('Target Volume: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal. Fill Jug X', (targetVolume: number, jugXCapacity: number, jugYCapacity: number) => {
    expect(mix(jugXCapacity, jugYCapacity, targetVolume)).toEqual(MixResult.Solved);
  });
});


describe('One of the Jugs has less Capacity than the target Volume, the other Jug has sufficient Capacity to fill the target Volume', () => {
  it.each([
    [2, 1, 2],
    [2, 1, 4],
    [6, 2, 6],
    [6, 2, 8],
    [8, 2, 10],
    [96, 2, 100],
    [2, 2, 1],
    [2, 4, 1],
    [6, 6, 2],
    [6, 8, 2],
    [8, 10, 2],
    [96, 100, 2],
  ])
  ('Target Volume: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (targetVolume: number, jugXCapacity: number, jugYCapacity: number) => {
    expect(mix(jugXCapacity, jugYCapacity, targetVolume)).toEqual(MixResult.Solved);
  });
});

describe('No solution', () => {
  it.each([
    [2, 6, 5],
    [2, 6, 6],
    [2, 6, 10],
    [2, 10, 6],
  ])
  ('Target Volume: %p gal. Jug X capacity: %p gal. Jug Y capacity: %p gal', (targetVolume: number, jugXCapacity: number, jugYCapacity: number) => {
    expect(mix(jugXCapacity, jugYCapacity, targetVolume)).toEqual(MixResult.NoSolution);
  });
});
