import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";

import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true; //initially we are in login mode
  isLoading = false; //initially not loading
  error: string = null; //store an error which initially is null and of type string to hold an error message

  constructor(private authService: AuthService,
              private router: Router) {} //inject the authService into the authComponent to call the signup method ::: inject the router

  onSwitchMode() {  //to change the login mode property
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {    //check if the form is not valid first & then return => an extra validation step
      return;
    }
    const email = form.value.email;    //extract the email
    const password = form.value.password;   //extract the password

    let authObs: Observable<AuthResponseData>; //authorization observable of type observable :: import AuthResponseData to be yeilded by authObs


    this.isLoading = true; // set isLoading to true before the request (below) & after the information (above) is extracted
    if (this.isLoginMode) {   //check isLoginMode
      authObs = this.authService.login(email, password); //reach out to authService and login & forward email & password
    } else {
      authObs = this.authService.signup(email, password);  //reach out to authService and signup & forward email & password
    }

    authObs.subscribe( //call authObs.subscribe to the return value of signup/login (share the code)
      resData => {    //& get the response data if the sign up/login succeeds
        console.log(resData);   //log the response data
        this.isLoading = false;    //set isLoading back to false because not loading anymore
        this.router.navigate(['/recipes']);  //use the router and navigate to /recipes => forward the user to a different route once logged in
      },
      errorMessage => {   //might get an error and if so get the error message
        console.log(errorMessage);   // and then print the error message to the console
        this.error = errorMessage;  //set error = to the errorMessage
        this.isLoading = false;    //set isLoading back to false because not loading anymore
      }
    );

    // console.log(form.value); //submit/log the form value
    form.reset(); //reset the form once we are done
  }
}
