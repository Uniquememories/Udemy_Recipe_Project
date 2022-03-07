export class User {
  constructor(    //create a user with a new keyword => automatically storing arguments of the constructor in properties of the class by adding accessor (public/private) in front of the argument name (email, id, etc) => user have an email of type string, id of type string.. etc (token is private so it cannot be retreivable :: need a getter to retrieve it)
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {   //add a check-> if the tokenExpirationDate does not exist or if the current date (newDate) is greater than the tokenExpirationDate (then it is expired) in that case return null
    return null;
    }
    return this._token;   // return this_token
  }
}
