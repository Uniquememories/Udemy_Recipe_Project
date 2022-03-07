import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

//authGuard ==> to decide whether the user has access/permission to view specific page / route / path in the application or not.
//only reach a specific page if logged in (the recipes page)
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(  //add the canActivate method:: recieves current active route(ActivatedRouteSnapshot), the router RouterStateSnapshot & has to return either a boolean or a promise that eventually yeilds a boolean or an observable that eventually yeilds a boolean or a UrlTree (to deal with the urls)
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(  //see if user is authenticated:: access authService user and return it =>
      take(1),  //use take one to look into the user only once => take latest user value only & then unsubscribe so dont have ongoing listener
      map(user => {   //use pipe and map operator to transpform the observable value => get our user &
      // return !!user; //return not not user which converts a truish value to true and a falsish value to false (a boolean)
        const isAuth = !!user; //return not not user (stored in isAuth) which converts a truish value to true and a falsish value to false (a boolean)
        if (isAuth) { //if the user is authenticated
          return true; //then return true
        }
        return this.router.createUrlTree(['/auth']);  //otherwise return a url tree by using router and calling createUrlTree & pass in array of routes to redirect to
      }),
      // tap(isAuth => { //one way to redirect a user when a url is blocked call tap and use isAuth
      //   if (!isAuth) {  //if user is not authenticated
      //     this.router.navigate(['/auth']);  //then call the router and navigate back to the authenticate page (eg: if try to use recipes route when not authenticated)
      //   }
      // })
    );
  }
}
