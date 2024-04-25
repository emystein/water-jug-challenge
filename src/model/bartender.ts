import Jug from './jug.js';
import Gallons from './gallons.js';

export default class Bartender {
  constructor(public amountExpected: Gallons, public jugX: Jug, public jugY: Jug) {

  }

  solved() {
    return this.jugX.amountFilled.isEqualTo(this.amountExpected) || this.jugY.amountFilled.isEqualTo(this.amountExpected);
  }

  fill(jug: Jug) {
    jug.fill()
  }

  transfer(jugA: Jug, jugB: Jug) {
    if (jugA.filledContentFitsCompletelyIn(jugB)) {
      jugB.add(jugA.capacity);
      jugA.empty();
    } else {
      const amountToTransfer = jugB.remainingToFill()
      jugB.add(amountToTransfer);
      jugA.remove(amountToTransfer);
    }
  }

  empty(aJug: Jug) {
    aJug.empty();
  }
}

