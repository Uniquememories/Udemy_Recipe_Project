import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"; //send http requests
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {  //save recipes to backend (database) and fetch from there
  constructor(
    private http: HttpClient, //inject the httpClient to send http requests
    private recipeService: RecipeService, //inject the recipeService to retrieve the list of recipes
    private authService: AuthService,  //inject authService
  ) {}

  //start with saving recipes
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();  //retrieve list of recipes by reaching out to the RecipeService (which was injected in the constructor) then getting recipes (temporarily stored in const recipes => the constant)
    this.http
      .put(
        'https://ng-course-recipe-book-4ca07-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
    //make the http request => use http client and use put request (store all recipes and override any previous stored recipes) and enter URL from firebase [add onto url: /recipes.json] ==> need to tell angular what to attach to request:: our recipes // then subscribe direcly in the service,, get back a response & console the response to see it.
  }

  //fetch the recipes
  fetchRecipes() {

        return this.http.get<Recipe[]>(   //fetch the recipes by using the httpClient with a get request ((add annotation <> to make clear the format the response body will have => recipe array [] & import recipe model)) with the same URL where we want to send the request to get the recipes ==> & return this call to http service (need to subscribe in header.component.ts in onFetchData)
          'https://ng-course-recipe-book-4ca07-default-rtdb.firebaseio.com/recipes.json',
          // {
          //   params: new HttpParams().set('auth', user.token)
          //   //set the token manually by adding a query parameter at end of URL (...recipes.json?auth=' +  user.token) or non manual option to set the params to set the new HttpParams object to call set and set auth equal to user.token
          // }
        )
        .pipe(//call pipe & pass in map
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ... recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),//add map rxjs operator (import) to transform recipe data ,, get the recipes (that might not have an ingredient) & return recipes & call map (called on an array -> a JS array method map //allows us to transform the elements in an array) transform the elements in the recipes array--> takes an anonymous function that is executed for every recipe & return the transformed recipe (return the original recipe but if doesnt have ingredients array set it equal to an empty array) return new object with spread operator to copy all the properties of recipe, & then ingredients are set equal to an expression to check if recipe.ingredients is truish and if so set it equal to recipe.ingredients and if not then set equal to an empty array.);
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }) //add tap rxjs operator (imported) => [allows to execute code in place without altering the data funneled through the observable] => get our recipes array & use the injected recipeService & call setRecipes to then forward our recipes
    );
  }
}
