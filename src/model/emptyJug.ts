import Jug from './jug.js';
import Gallons from './gallons.js';

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

export class TransferContentBetweenJugs implements MixAction {
  public triggeringJug: Jug;
  public otherJug: Jug | undefined;
  public text: string;

  constructor(sender: Jug, receiver: Jug, transferredVolume: Gallons) {
    this.triggeringJug = sender.cloneFilledWith(sender.volumeFilled);
    this.otherJug = receiver.cloneFilledWith(transferredVolume);
    this.text = `Transfer from Jug ${sender.name} to Jug ${receiver.name}`;
  }
}

export class EmptyJug implements MixAction {
  public triggeringJug: Jug;
  public otherJug: Jug | undefined;
  public text: string;

  constructor(emptyJug: Jug) {
    this.triggeringJug = emptyJug.clone();
    this.text = `Empty Jug ${emptyJug.name}`;
  }
}
