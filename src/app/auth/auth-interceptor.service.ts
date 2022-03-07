import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}  //inject the authService

  //intercept method from the HttpInterceptor takes two arguments:: the HttpRequest(generic type any: dont know which type of data it will return) and next => the HttpHandler (both imported)
  intercept(req: HttpRequest<any>, next: HttpHandler) {   //edit the request and add the token
    return this.authService.user.pipe(  //reach out to the authService and to the user, use the pipe method and take to only get the user once :: and pass the number 1 to take one value from the observable & then automatically unsubscribe //use the exhaustMap will pass in the user and return the http request where we fetch the recipes
      take(1),
      exhaustMap(user => {

        if(!user) {   //add a check => if we dont have a user then return next handle for the original request so we dont try to modify it(modifiedReq)
          return next.handle(req);
        }
        const modifiedReq = req.clone({  //edit the request based on the user:: create the modified request and call request clone
          params: new HttpParams().set('auth', user.token)  //to clone pass in an object:: update the params by setting them to a new HttpParams & call set & pass in the params => auth is name of params needed and user.token is the value
        });
        return next.handle(modifiedReq);    //return next handle and pass in the modified request
      })
    );
  }
}
