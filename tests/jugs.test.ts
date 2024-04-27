import Jugs from '../src/model/jugs';
import Gallons, { IllegalVolume } from '../src/model/volume';

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

  test('When jug1 is jugX and jug2 is undefined', () => {
    const { jugX, jugY } = jugs.identifyJugs(jugs.jugX, undefined);
    expect(jugX).toBe(jugs.jugX);
    expect(jugY).toBe(jugs.jugY);
  });

  test('When jug1 is jugX and jug2 is jugY', () => {
    const { jugX, jugY } = jugs.identifyJugs(jugs.jugX, jugs.jugY);
    expect(jugX).toBe(jugs.jugX);
    expect(jugY).toBe(jugs.jugY);
  });

  test('When jug1 is jugY and jug2 is undefined', () => {
    const { jugX, jugY } = jugs.identifyJugs(jugs.jugY, undefined);
    expect(jugX).toBe(jugs.jugX);
    expect(jugY).toBe(jugs.jugY);
  });

  test('When jug1 is jugY and jug2 is jugX', () => {
    const { jugX, jugY } = jugs.identifyJugs(jugs.jugX, jugs.jugY);
    expect(jugX).toBe(jugs.jugX);
    expect(jugY).toBe(jugs.jugY);
  });
});
