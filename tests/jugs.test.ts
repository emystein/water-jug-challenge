import Jugs from '../src/model/jugs';
import Gallons, { IllegalVolume } from '../src/model/volume';
import Jug from '../src/model/jug';

describe('Jugs Capacities', () => {
  test('Illegal Jug X capacity', () => {
    expect(() => Jugs.withCapacities(new Gallons(-1), Gallons.positive(1))).toThrow(IllegalVolume);
  });
  test('Illegal Jug Y capacity', () => {
    expect(() => Jugs.withCapacities(Gallons.positive(1), new Gallons(-1))).toThrow(IllegalVolume);
  });
});

describe('Identify Jugs', () => {
  const jugs = Jugs.withCapacities(new Gallons(1), Gallons.positive(1));

  it.each([
    [jugs.jugX, undefined],
    [jugs.jugX, jugs.jugY],
    [jugs.jugY, undefined],
    [jugs.jugY, jugs.jugX],
  ])
  ('Jug 1: %p, Jug 2: %p', (jug1: Jug, jug2: Jug | undefined) => {
    const { jugX, jugY } = jugs.identifyJugs(jug1, jug2);
    expect(jugX).toBe(jugs.jugX);
    expect(jugY).toBe(jugs.jugY);
  });
});
