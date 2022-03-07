import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { User } from "./user.model";

export interface AuthResponseData {  //the data that we will get back per the firebase doc => export it so it can be used in auth.component.ts file
  idToken: 	string;
  email: 	string;
  refreshToken: 	string;
  expiresIn:	string;
  localId:  string;
  registered?: boolean; //the ? means it is optional because it is only needed for sign in(login) and not sign up
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null); //store the authenticated user as a BehaviorSubject(imported) which gives subscribes access to currently access user => and store the user(imported) in the subject => get access to token and need starting value of null to not start out with a user //&& emit (next) a new user whenever we have one we login or also when we log out (when the user becomes invalid or the token expires)
  private tokenExpirationTimer: any; //to clear the token expiration timer (store it in this property)

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {  //signup method to sign the user up
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAImsQQbp3Hh5oxZuOU_qCtbHt_texd70U',
        {
          email: email,
          password: password,
          returnSecureToken: true
          //(return the observable so we can subscribe) use the http client injected to send a POST request from the URL in Firebase Authentication & User Management (Sign up Email/Password) doc: see: (https://firebase.google.com/docs/reference/rest/auth#section-create-email-password) =>
          //replace the [API-KEY] portion of the URL with your api key from firebase database created => project overview gear icon => project settings => Web API Key ::::
          //the data; email, password, and returnSecureToken is what is required from the firebase doc.
        }
      )
      .pipe(    //use pipe and add the catchError operator to pass handleError(refers to the private method below) display error for signing up
        catchError(this.handleError),
        tap(resData => {  //add the tap opertator (imported) & get our response data & call handleAuthentication(below)
          this.handleAuthentication(   //forward resData.email,localId,idToken,expiresIn(as a number so add a +)
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAImsQQbp3Hh5oxZuOU_qCtbHt_texd70U',
        {
          email: email,
          password: password,
          returnSecureToken: true
          //use http client and send a post request to the URL in the firebase docs Authentication & User Management (sign in w/ email/pswrd)
          //replace [API-KEY] with the api key in project settings of firebase dattabase (same API key as above)
          //data; email, password, and returnSecureToken is what is required from the firebase doc. as the body here
        }
      )
      .pipe(    //use pipe and add the catchError operator to pass handleError(refers to the private method below) display error for logging in
        catchError(this.handleError),
        tap(resData => {  //add the tap opertator (imported) & get our response data & call handleAuthentication(below)
          this.handleAuthentication(   //forward resData.email,localId,idToken,expiresIn(as a number so add a +)
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  //retrieve the userData that is stored in /from the localStorage
  autoLogin () {  //automatically set the user to login when app starts
    //look in local storage and check if there is an existing user snapshot stored
    const userData: {   //include a type annotation of what type of data to have in the snapshot
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string; //will have to convert to date
    } = JSON.parse(localStorage.getItem('userData'));   //create userData to access the localStorage & get the userData item => use JSON.parse to take the userData that was converted into a string (JSON.stringify) back to a JS object.
    if (!userData) {//check if we dont have the userData
      return;   //then return so the user can sign in
    }
    //otherwise if the userData is stored
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );  //create a new loadedUser by calling new User & pass in data from user snapshot(userData) (convert _tokenExpirationDate with new Date() constructor)

    if (loadedUser.token) { //check if the user has a valid token:: if loadedUser.token is truish
      this.user.next(loadedUser);   //emit loaded user as the active user
      //create the expirationDuration which is the _tokenExpirationDate timestamp in miliseconds (use getTime) minus current time stamp (new Date) in miliseconds with getTime
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);  //call autoLogout & calculate the remaining expirationDuration time
    }
  }

  logout() {
    this.user.next(null);     //use user to call next and pass null to set our user to null
    this.router.navigate(['/auth']);  //use router& navigate to redirect the user once logged out to authenticate page
    localStorage.removeItem('userData');   //clear.remove the localStorage/snapshot when logging out
    if (this.tokenExpirationTimer) {  //check if have an active timer
      clearTimeout(this.tokenExpirationTimer); //if so, then pass tokenExpirationTimer into clearTimeout
    }
    this.tokenExpirationTimer = null;   //set tokenExpirationTimer back to null
  }

  //sets/manages timer for automatically logging the user out
  autoLogout(expirationDuration: number) {  //gets the expirationDuration:: amount of miliseconds until the token is invalid
    console.log(expirationDuration); 
    this.tokenExpirationTimer = setTimeout(() => {    //use setTimeout to set the expirationDuration & after the duration call this.logout function above :: set equal to tokenExpirationTimer to store
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(   //private method get email,userId,token,&expiresIn
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);  //generate the expiration date of type date object based on the expires in time(get the current date & call getTime{current timestamp in milliseconds} and add expiresIn times 1,000)
    const user = new User(    //create the new user object to forward the email,userid,token,&exipration date
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);   //use the subject(user) to next the user => to emit it as the currently logged in user ::emit user object to our application
    this.autoLogout(expiresIn * 1000);  //call autoLogout and pass current expiration time(expires in times 1000 to give amount in miliseconds)
    localStorage.setItem('userData', JSON.stringify(user)); //store the user object in local storage:: use localStorage and call setItem (allows to write an item to the local storage & store data there) give name 'userData'(key to retrieve the data later), write data to the key:: the user above which has all the data that created the user object=> converted to a string with JSON.stringify method
  }

  private handleError(errorRes: HttpErrorResponse) { //private method get an error response of type HttpErrorResponse(imported) :: get that response &
    let errorMessage = 'An unknown error occurred!';   // add a default error message
    if (!errorRes.error || !errorRes.error.error) {   //check if errorRes does not have an error key or does not have an error key on the error key (nested error key)
      return throwError(errorMessage); //then return throw error with the the errorMessage
    }
    switch (errorRes.error.error.message) { //check with a switch statement if errorRes(ponse) ::(error..error...message==> nested from the console)
      case 'EMAIL_EXISTS':    //the case EMAIL_EXISTS from firebase doc and in console
        errorMessage = 'This email exists already';  //set the error message
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage); //return throw error with the the errorMessage
  }
}
