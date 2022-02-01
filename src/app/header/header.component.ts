import { DataStorageService } from './../shared/data-storage.service';
import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {} //inject the DataStorageService to be able to call the stored recipes

  onSaveData() {
    this.dataStorageService.storeRecipes();   //use dataStorageService to call storeRecipes to store the recipes with the save data dropdown button
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(); //use dataStorageService to call fetch recipes to get the recipes with the fetch data dropdown button => need to subscribe => dont need to pass anything in
  }
}
