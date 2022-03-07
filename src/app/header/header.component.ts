import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';

import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;  //is authenticated property always false (user is not automatically authenticated)
  private userSub: Subscription;    //set up the property to store the subscription so we can unsubscribe

  constructor(
    private dataStorageService: DataStorageService, //inject the DataStorageService to be able to call the stored recipes
    private authSevice: AuthService   //inject the authService
    ) {}

  ngOnInit() {
    this.userSub = this.authSevice.user.subscribe(user => {   //set up a subscription to this authService user ?? store the subscription in userSub & get a user object
      this.isAuthenticated = !!user;  //set isAuthenticated = to a check if not is user then set value to false otherwise is true (or not not user => get true if we have a user and false if not))
      console.log(!user);   //console not user to see what we get
      console.log(!!user);   //console not not user to see what er get
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();   //use dataStorageService to call storeRecipes to store the recipes with the save data dropdown button
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(); //use dataStorageService to call fetch recipes to get the recipes with the fetch data dropdown button => need to subscribe => dont need to pass anything in
  }

  onLogout() {
    this.authSevice.logout();  //use the authservice to call logout from authService
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();   //to clear(unsubscribe from) the subscription
  }
}
