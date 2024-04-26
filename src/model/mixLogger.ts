import Jug from './jug.js';
import Jugs from './jugs.js';
import { MixAction } from './mixActions.js';

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

  addEntry(action: MixAction): void {
    const step = this.entries.length + 1;
    const otherJug = action.otherJug ? action.otherJug : { ...this.jugs.otherJugThan(action.triggeringJug) } as Jug;
    this.entries.push(new MixLogEntry(step, action.triggeringJug, otherJug, action.text));
  }
}
