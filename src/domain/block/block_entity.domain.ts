import { BlockTime } from "@Domain/block/bloc_time_value.domain";

export class Block {
  private _jti: string;
  private _blockTime: BlockTime;

  constructor(jti, blockTime) {
      this._jti = jti;
      this._blockTime = blockTime;
  }

  get jti() {
    return this._jti;
  }

  get from() {
    return this._blockTime.from;
  }

  get to() {
    return this._blockTime.to;
  }

  get isForever() {
    return this._blockTime.forEver;
  }
}
