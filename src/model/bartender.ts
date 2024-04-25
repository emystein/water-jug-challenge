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
        smallerJug.fill();
        smallerJug.transferContentTo(biggerJug);
      }
      smallerJug.fill();
      smallerJug.transferContentTo(biggerJug);
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
