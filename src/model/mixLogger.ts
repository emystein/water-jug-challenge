import Jug from './jug';
import Jugs from './jugs';
import { MixAction } from './mixActions';

export class MixLogEntry {
  public jugX: Jug;
  public jugY: Jug;

  constructor(public step: number, jugX: Jug, jugY: Jug, public action: string) {
    this.jugX = jugX.clone();
    this.jugY = jugY.clone();
  }
}

export default class MixLogger {
  public entries: MixLogEntry[] = [];

  constructor(public jugs: Jugs) {

  }

  addEntry(action: MixAction): void {
    const step = this.entries.length + 1;
    const { jugX, jugY } = this.jugs.identifyJugs(action.triggeringJug, action.otherJug);
    this.entries.push(new MixLogEntry(step, jugX, jugY, action.text));
  }
}
