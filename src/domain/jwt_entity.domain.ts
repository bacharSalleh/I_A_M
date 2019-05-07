export class JWT {
  private _access_token: string;
  private _exp: number;
  private _id: number;
  private _jti: string;

  constructor(id, token, exp, jti) {
    this._access_token = token;
    this._exp = exp;
    this._id = id;
    this._jti = jti;
  }

  get access_token() {
    return this._access_token;
  }

  get exp() {
    return this._exp;
  }

  get id() {
    return this._id;
  }

  get jti() {
    return this._jti;
  }
}
