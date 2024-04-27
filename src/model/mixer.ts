import Gallons, { PositiveGallons } from './volume';
import Jugs from './jugs';
import MixLogger from './mixLogger';
import { EmptyJug, FillJug, TransferContentBetweenJugs } from './mixActions';
import Jug from './jug';

export default class Mixer {
  private recipes: MixRecipe[];

  constructor(private logger: MixLogger) {
    this.recipes = [
      new FillOnlyOneJug(this),
      new TransferFromSmallerToBiggerJug(this),
      new TransferFromBiggerToSmallerJug(this)
    ]
  }

  mix(jugs: Jugs, targetVolume: PositiveGallons): MixResult {
    const recipe = this.recipes.find(recipe => recipe.appliesTo(jugs, targetVolume));
    return recipe.mix(jugs, targetVolume);
  }

  fill(aJug: Jug): void {
    aJug.fill();
    this.logger.addEntry(new FillJug(aJug));
  }

  empty(aJug: Jug): void {
    aJug.empty();
    this.logger.addEntry(new EmptyJug(aJug));
  }

  transferBetween(sender: Jug, receiver: Jug, accumulatedVolume: Gallons): void {
    sender.transferContentTo(receiver);
    this.logger.addEntry(new TransferContentBetweenJugs(sender, receiver, accumulatedVolume));
  }
}

abstract class MixRecipe {
  constructor(protected mixer: Mixer) {

  }

  abstract appliesTo(jugs: Jugs, targetVolume: Gallons): boolean;

  mix(jugs: Jugs, targetVolume: Gallons): MixResult {
    this.prepare(jugs, targetVolume);
    return this.checkResult(jugs, targetVolume);
  }

  abstract prepare(jugs: Jugs, targetVolume: Gallons): void;

  private checkResult(jugs: Jugs, targetVolume: Gallons): MixResult {
    if (jugs.haveAJugFilledWithVolume(targetVolume)) {
      return MixResult.Solved;
    } else {
      return MixResult.NoSolution;
    }
  }
}

class FillOnlyOneJug extends MixRecipe {
  appliesTo(jugs: Jugs, targetVolume: Gallons): boolean {
    return jugs.haveAJugWithTheSameCapacityThan(targetVolume);
  }

  prepare(jugs: Jugs, targetVolume: Gallons): void {
    const firstMatchingJug = jugs.allWithTheSameCapacityThan(targetVolume)[0];
    this.mixer.fill(firstMatchingJug);
  }
}

class TransferFromSmallerToBiggerJug extends MixRecipe {
  appliesTo(jugs: Jugs, targetVolume: Gallons): boolean {
    return jugs.jugWithNearestCapacityTo(targetVolume) == jugs.smallerJug;
  }

  prepare(jugs: Jugs, targetVolume: Gallons): void {
    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;
    let accumulatedVolume = new Gallons(0);
    while (accumulatedVolume.isLowerThan(targetVolume)) {
      this.mixer.fill(smallerJug);
      accumulatedVolume = accumulatedVolume.plus(smallerJug.capacity);
      this.mixer.transferBetween(smallerJug, biggerJug, accumulatedVolume);
    }
  }
}

class TransferFromBiggerToSmallerJug extends MixRecipe {
  appliesTo(jugs: Jugs, targetVolume: Gallons): boolean {
    return jugs.jugWithNearestCapacityTo(targetVolume) == jugs.biggerJug;
  }

  prepare(jugs: Jugs, targetVolume: Gallons): void {
    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;
    this.mixer.fill(biggerJug);
    while (biggerJug.volumeFilled.isHigherThan(targetVolume)) {
      this.mixer.empty(smallerJug);
      this.mixer.transferBetween(biggerJug, smallerJug, smallerJug.capacity);
    }
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
