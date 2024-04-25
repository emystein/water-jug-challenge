import Jug from './jug.js';
import Jugs from './jugs.js';
import { MixAction } from './bartender.js';

export class MixLogEntry {
  constructor(
    public step: number,
    public triggeringJug: Jug,
    public otherJug: Jug,
    public action: string,
  ) {

  }
}

export default class MixLogger {
  public entries: MixLogEntry[] = [];

  constructor(public jugs: Jugs) {

  }

  addEntry(action: MixAction) {
    this.entries.push(new MixLogEntry(
      this.entries.length + 1,
      { ...action.triggeringJug } as Jug,
      { ...this.jugs.otherJugThan(action.triggeringJug) } as Jug,
      action.text,
    ));
  }
}
