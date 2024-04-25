import Gallons from './gallons.js';
import Jugs from './jugs.js';

export default class Bartender {
  constructor(public targetVolume: Gallons) {

  }

  mix(jugs: Jugs) {
    const smallerJug = jugs.smallerJug;
    const biggerJug = jugs.biggerJug;
    if (jugs.jugWithCloserCapacityTo(this.targetVolume) == smallerJug) {
      let transferredVolume = new Gallons(0);
      while (transferredVolume.isLessThan(this.targetVolume)) {
        smallerJug.fill();
        smallerJug.transferContentTo(biggerJug);
        transferredVolume = transferredVolume.plus(smallerJug.capacity);
      }
    } else {
      biggerJug.fill();
      for (let i: number = biggerJug.capacity.amount; i > this.targetVolume.amount; i = i - smallerJug.capacity.amount) {
        biggerJug.transferContentTo(smallerJug);
        smallerJug.empty();
      }
    }
    return jugs.anyJugIsFilledWithVolume(this.targetVolume);
  }
}
