import Jug from './jug.js';
import Gallons from './gallons.js';
import Jugs from './jugs.js';

export default class Bartender {
  constructor(public targetVolume: Gallons) {

  }

  mix(jugs: Jugs) {
    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;
    if (jugs.jugWithCloserCapacityTo(this.targetVolume) == smallerJug) {
      for (let i: number = 0; i < (this.targetVolume.amount - smallerJug.capacity.amount); i = i + smallerJug.capacity.amount) {
        this.fill(smallerJug);
        this.transfer(smallerJug, biggerJug);
      }
      this.fill(smallerJug);
      this.transfer(smallerJug, biggerJug);
    } else {
      this.fill(biggerJug);
      for (let i: number = biggerJug.capacity.amount; i > this.targetVolume.amount; i = i - smallerJug.capacity.amount) {
        this.transfer(biggerJug, smallerJug);
        this.empty(smallerJug);
      }
    }
    return jugs.anyJugIsFilledWithVolume(this.targetVolume);
  }

  fill(jug: Jug) {
    jug.fill();
  }

  transfer(jugA: Jug, jugB: Jug) {
    if (jugA.filledContentFitsCompletelyIn(jugB)) {
      jugB.add(jugA.capacity);
      jugA.empty();
    } else {
      const amountToTransfer = jugB.remainingToFill();
      jugB.add(amountToTransfer);
      jugA.remove(amountToTransfer);
    }
  }

  empty(aJug: Jug) {
    aJug.empty();
  }
}
