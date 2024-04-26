import Jug from './jug.js';
import Gallons from './gallons.js';

export abstract class MixAction {
  protected constructor(
    public triggeringJug: Jug,
    public otherJug: Jug | undefined,
    public text: string) {
  }
}

export class FillJug extends MixAction {
  constructor(triggeringJug: Jug) {
    super(
      triggeringJug.cloneFilledWith(triggeringJug.capacity),
      undefined,
      `Fill Jug ${triggeringJug.name}`,
    );
  }
}

export class TransferContentBetweenJugs extends MixAction {
  constructor(sender: Jug, receiver: Jug, transferredVolume: Gallons) {
    super(
      sender.cloneFilledWith(sender.volumeFilled),
      receiver.cloneFilledWith(transferredVolume),
      `Transfer from Jug ${sender.name} to Jug ${receiver.name}`,
    );
  }
}

export class EmptyJug extends MixAction {
  constructor(emptyJug: Jug) {
    super(emptyJug.clone(), undefined, `Empty Jug ${emptyJug.name}`);
  }
}
