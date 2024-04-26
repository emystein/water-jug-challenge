import Gallons from './gallons.js';
import Jugs from './jugs.js';
import MixLogger from './mixLogger.js';
import Jug from './jug.js';

export interface MixAction {
  triggeringJug: Jug;
  otherJug: Jug | undefined;
  text: string;
}

export class FillJug implements MixAction {
  public triggeringJug: Jug;
  public otherJug: Jug | undefined;
  public text: string;

  constructor(triggeringJug: Jug) {
    this.triggeringJug = triggeringJug.cloneFilledWith(triggeringJug.capacity);
    this.text = `Fill Jug ${triggeringJug.name}`;
  }
}

class TransferContentBetweenJugs implements MixAction {
  public triggeringJug: Jug;
  public otherJug: Jug | undefined;
  public text: string;

  constructor(sender: Jug, receiver: Jug, transferredVolume: Gallons) {
    this.triggeringJug = sender.cloneFilledWith(sender.volumeFilled);
    this.otherJug = receiver.cloneFilledWith(transferredVolume);
    this.text = `Transfer from Jug ${sender.name} to Jug ${receiver.name}`;
  }
}

class EmptyJug implements MixAction {
  public triggeringJug: Jug;
  public otherJug: Jug | undefined;
  public text: string;

  constructor(emptyJug: Jug) {
    this.triggeringJug = emptyJug.clone();
    this.text = `Empty Jug ${emptyJug.name}`;
  }
}

export default class Bartender {
  constructor(public targetVolume: Gallons, private logger: MixLogger) {
  }

  mix(jugs: Jugs): MixResult {
    if (jugs.anyJugHasTheSameCapacityThan(this.targetVolume)) {
      const fillingJug = jugs.allWithTheSameCapacityThan(this.targetVolume)[0];
      fillingJug.fill();
      this.logger.addEntry(new FillJug(fillingJug));
      return MixResult.Solved;
    }

    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;

    if (jugs.jugWithCloserCapacityTo(this.targetVolume) == smallerJug) {
      let transferredVolume = new Gallons(0);
      while (transferredVolume.isLessThan(this.targetVolume)) {
        smallerJug.fill();
        this.logger.addEntry(new FillJug(smallerJug));
        smallerJug.transferContentTo(biggerJug);
        transferredVolume = transferredVolume.plus(smallerJug.capacity);
        this.logger.addEntry(new TransferContentBetweenJugs(smallerJug, biggerJug, transferredVolume));
      }
    } else {
      biggerJug.fill();
      this.logger.addEntry(new FillJug(biggerJug));
      while (biggerJug.volumeFilled.isGreaterThan(this.targetVolume)) {
        smallerJug.empty();
        this.logger.addEntry(new EmptyJug(smallerJug));
        biggerJug.transferContentTo(smallerJug);
        this.logger.addEntry(new TransferContentBetweenJugs(biggerJug, smallerJug, smallerJug.capacity));
      }
    }

    const solved = jugs.anyJugIsFilledWithVolume(this.targetVolume);

    return solved ? MixResult.Solved : MixResult.NoSolution;
  }
}

export enum MixResult {
  Solved,
  NoSolution
}
