export class BlockTime {
  private _from: Date;
  private _to: Date;
  private _forEver: boolean;


  constructor(forEver, from = null, to = null){
    this._from = from;
    this._to = to;
    this._forEver = forEver;
  }

  public get from() {
    return this._from;
  }

  public get to() {
    return this._to;
  }

  public get forEver() {
    return this._forEver;
  }
}
