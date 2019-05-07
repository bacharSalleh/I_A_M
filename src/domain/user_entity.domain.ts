export class User {
  private _id: number;
  private _username: string;
  private _password: string;
  private _email: string;
  private _roles: string[];

  constructor(attrs: {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: string[];
  }) {
    this._id = attrs.id;
    this._username = attrs.username;
    this._password = attrs.password;
    this._email = attrs.email;
    this._roles = attrs.roles;
  }

  get id() {
    return this._id;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  get email() {
    return this._email;
  }
  get roles() {
    return this._roles;
  }
}
