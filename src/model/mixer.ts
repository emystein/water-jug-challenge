import Gallons, { PositiveGallons } from './volume';
import Jugs from './jugs';
import MixLogger from './mixLogger';
import { EmptyJug, FillJug, TransferContentBetweenJugs } from './mixActions';
import Jug from './jug';

export default class Mixer {
  private recipes: MixRecipe[];

  constructor(public targetVolume: PositiveGallons, private logger: MixLogger) {
    this.recipes = [
      new FillOnlyOneJug(this),
      new TransferFromSmallerToBiggerJug(this),
      new TransferFromBiggerToSmallerJug(this)
    ]
  }

  mix(jugs: Jugs): MixResult {
    const recipe = this.recipes.find(aRecipe => aRecipe.appliesTo(jugs, this.targetVolume));
    if (recipe) {
      return recipe.mix(jugs, this.targetVolume);
    } else {
      return MixResult.NoSolution;
    }
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
    let accumulatedVolume = new Gallons(0);
    while (accumulatedVolume.isLowerThan(targetVolume)) {
      this.mixer.fill(jugs.smallerJug);
      accumulatedVolume = accumulatedVolume.plus(jugs.smallerJug.capacity);
      this.mixer.transferBetween(jugs.smallerJug, jugs.biggerJug, accumulatedVolume);
    }
  }
}

class TransferFromBiggerToSmallerJug extends MixRecipe {
  appliesTo(jugs: Jugs, targetVolume: Gallons): boolean {
    return jugs.jugWithNearestCapacityTo(targetVolume) == jugs.biggerJug;
  }

  prepare(jugs: Jugs, targetVolume: Gallons): void {
    this.mixer.fill(jugs.biggerJug);
    while (jugs.biggerJug.volumeFilled.isHigherThan(targetVolume)) {
      this.mixer.empty(jugs.smallerJug);
      this.mixer.transferBetween(jugs.biggerJug, jugs.smallerJug, jugs.smallerJug.capacity);
    }
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
