export class DTO<T> {
  private _error: any;
  private _data: T ;

  constructor(error, data: T = null) {
    (this._error = error), (this._data = data);
  }
  get error() {
    return this._error;
  }
  get data() {
    return this._data;
  }
}
