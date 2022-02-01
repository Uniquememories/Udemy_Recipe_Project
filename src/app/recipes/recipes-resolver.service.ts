import { RecipeService } from './recipe.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from './../shared/data-storage.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {  //Resolver: code that runs before a route is loaded to ensure certain data the route depends on is there. It implements Resolve (generic interface) define which type of data it will resolve => Recipe +> an array of recipes => will run some code that will load recipes

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) {} //inject the dataStorageService => the service to make the http request so we can fetchRecipes // inject RecipesService

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {//add a resolve method that gets data about the route, the ActivatedRouteSnapshot (imported) & that gets the current routing state: of type RouterStateSnapshot (imported)
    const recipes = this.recipesService.getRecipes(); //get our recipes from this recipesService & getRecipes=> check if we do have recipes & only fetch new ones if we dont

    if (recipes.length === 0) {   //check if recipes length is equal to 0, then we have no recipes & we should fetch them
      return this.dataStorageService.fetchRecipes();  //return this dataStorageService and fetchRecipes => [return either an array of recipes or an observable that will return an array of recipes]
    } else {
      return recipes; 
    } //else if recipes.lenght is not 0, then return the recipes
  }
}
