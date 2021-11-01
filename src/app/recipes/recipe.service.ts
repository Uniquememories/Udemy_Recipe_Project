import { EventEmitter } from '@angular/core';
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>(); //recipeSelected property an object instantated by using EventEmitter and will hold recipe data

  private recipes: Recipe[] = [ //recipes array
    new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_1280.png'),
  ];

  getRecipes() { //getRecipes method to return the recipes arra
    return this.recipes.slice(); // return recipes and call slice with no argument to return a new array which is a copy of the one in this service file => only get a copy
  }

}
