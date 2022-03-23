import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true; //initially we are in login mode
  isLoading = false; //initially not loading
  error: string = null; //store an error which initially is null and of type string to hold an error message
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  //add the PlaceholderDirective => will find first occurance of the directive in the Dom-> then store in a property of the component (alertHost of type PlaceholderDirective)

  private closeSub: Subscription; //to close the popup box instance that we subscribed to below

  constructor(
    private authService: AuthService,   //inject the authService into the authComponent to call the signup method
    private router: Router,   //inject the router
    private componentFactoryResolver: ComponentFactoryResolver) {} //inject the componentFactoryResolver::: maps components to generated component factory classes that can be used to create instances of components.

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
        this.showErrorAlert(errorMessage);  //called whenever we have an error & pass in the errorMessage
        this.isLoading = false;    //set isLoading back to false because not loading anymore
      }
    );

    // console.log(form.value); //submit/log the form value
    form.reset(); //reset the form once we are done
  }

  onHandleError() { //to reset the error popup alert
    this.error = null; //set error back to null
  }

  ngOnDestroy(): void {
    if (this.closeSub) {  //check if have active closeSub(scription)
      this.closeSub.unsubscribe();    //if do have one want to unsubscribe
    }
  }

  private showErrorAlert(message: string) { //has to be called whenever we have an error => will receive the message
    // const alertCmp = new AlertComponent();   => this wouldnt work in Angular need to use the method below
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(    //=> will return an alert component factory
      AlertComponent    //use componentFactoryResolver to get access to the componentFactory & pass the type of component which is the AlertComponent
      );    //where we want to add that component
      const hostViewContainerRef = this.alertHost.viewContainerRef;   //get access to the view container reference of the host with alertHost
      hostViewContainerRef.clear();   //clear anything referenced there

      const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);   //use component factory to create a new alert component in the hostViewContainerRef by calling createComponent and pass in the alertcmpFactory => store in componentRef

      componentRef.instance.message = message   //use componentRef with its instance property to get access to message and set it equal to the message (gets the error message to load in the alert popup)
      this.closeSub = componentRef.instance.close.subscribe(() => { //use componentRef with its instance property get access to close & subscribe (stored in closeSub)
        this.closeSub.unsubscribe();    //then run the function and clear the component reference => call closeSub and unsubscribe (to clear the subscription)
        hostViewContainerRef.clear();   //to remove the component use hostViewContainerRef & call clear
      });
  }
}
