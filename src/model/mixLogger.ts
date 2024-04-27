import Jug from './jug';
import Jugs from './jugs';
import { MixAction } from './mixActions';

export class MixLogEntry {
  constructor(
    public step: number,
    public jugX: Jug,
    public jugY: Jug,
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
    const { jugX, jugY } = this.jugs.identifyJugs(action.triggeringJug, otherJug);
    this.entries.push(new MixLogEntry(step, jugX, jugY, action.text));
  }
}
