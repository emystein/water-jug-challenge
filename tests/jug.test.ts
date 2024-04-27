import Jug from '../src/model/jug';
import Gallons from '../src/model/volume';

describe('Jug', () => {
  let jug: Jug;
  const zeroGallons = new Gallons(0);
  const threeGallons = new Gallons(3);
  const sevenGallons = new Gallons(7);
  const tenGallons = new Gallons(10);

  beforeEach(() => {
    jug = new Jug('X', tenGallons);
  });

  test('fill', () => {
    jug.fill();
    expect(jug.volumeFilled).toBe(jug.capacity);
  });

  test('add water', () => {
    jug.add(tenGallons);
    expect(jug.volumeFilled).toEqual(tenGallons);
  });

  test('remove water', () => {
    jug.add(tenGallons);
    jug.remove(threeGallons);
    expect(jug.volumeFilled).toEqual(sevenGallons);
  });

  test('empty', () => {
    jug.add(tenGallons);
    jug.empty();
    expect(jug.volumeFilled).toEqual(zeroGallons);
  });

  test('transfer content to smaller jug', () => {
    const otherJug = new Jug('Y', threeGallons);
    jug.add(tenGallons);
    const transferredAmount = jug.transferContentTo(otherJug);
    expect(transferredAmount).toEqual(otherJug.capacity);
    expect(jug.volumeFilled).toEqual(sevenGallons);
    expect(otherJug.volumeFilled).toEqual(otherJug.capacity);
  });

  test('transfer content to bigger jug', () => {
    const otherJug = new Jug('Y', jug.capacity.plus(threeGallons));
    jug.fill();
    const transferredAmount = jug.transferContentTo(otherJug);
    expect(transferredAmount).toEqual(jug.capacity);
    expect(jug.volumeFilled).toEqual(zeroGallons);
    expect(otherJug.volumeFilled).toEqual(jug.capacity);
  });

  test('has less or equal Capacity than a bigger Jug', () => {
    const otherJug = new Jug('Other Jug', jug.capacity.plus(threeGallons));
    expect(jug.hasLessOrEqualCapacityThan(otherJug)).toBe(true);
  });

  test('has not less or equal Capacity than a smaller Jug', () => {
    const otherJug = new Jug('Other Jug', jug.capacity.minus(threeGallons));
    expect(jug.hasLessOrEqualCapacityThan(otherJug)).toBe(false);
  });

  test('has greater Capacity than a smaller Jug', () => {
    const otherJug = new Jug('Other Jug', jug.capacity.minus(threeGallons));
    expect(jug.hasGreaterCapacityThan(otherJug)).toBe(true);
  });

  test('has not greater Capacity than a bigger Jug', () => {
    const otherJug = new Jug('Other Jug', jug.capacity.plus(threeGallons));
    expect(jug.hasGreaterCapacityThan(otherJug)).toBe(false);
  });

  test('has specific capacity', () => {
    expect(jug.hasCapacity(jug.capacity)).toBe(true);
  });

  test('capacity difference with bigger volume', () => {
    expect(jug.capacityDifferenceWith(jug.capacity.plus(threeGallons))).toEqual(threeGallons);
  });

  test('capacity difference with smaller volume', () => {
    expect(jug.capacityDifferenceWith(jug.capacity.minus(threeGallons))).toEqual(threeGallons);
  });

  test('clone', () => {
    const clonedJug = jug.clone();
    expect(clonedJug.name).toEqual(jug.name);
    expect(clonedJug.capacity).toEqual(jug.capacity);
    expect(clonedJug.volumeFilled).toEqual(jug.volumeFilled);
  });

  test('clone filled with specific volume', () => {
    const clonedJug = jug.cloneFilledWith(threeGallons);
    expect(clonedJug.name).toEqual(jug.name);
    expect(clonedJug.capacity).toEqual(jug.capacity);
    expect(clonedJug.volumeFilled).toEqual(threeGallons);
  });
});
