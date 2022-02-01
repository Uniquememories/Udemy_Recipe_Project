import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [ //recipes array
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://steemitimages.com/p/o1AJ9qDyyJNSpZWhUgGYc3MngFqoAMfAtHcWN7TdVVgaqxn1U?format=match&mode=fit&width=640',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else do you need to say?',
  //     'https://cdn-cmjom.nitrocdn.com/FpMsHpAgoVrRMnuAdmBhGkyiizdsWlSU/assets/static/optimized/rev-0223ca3/wp-content/uploads/2019/08/fb19_original-fatburger.png.webp',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1),
  //     ]),
  // ];
  //initialize an empty array of recipes since dummy data of recipes are not being used (when app loads have no recipes and need to load them)
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {} //inject the slService in the constructor (add @Injectable() to inject)

  setRecipes(recipes: Recipe[]) {  //method to override the existing recipes(above) ==> get an array of recipes
    this.recipes = recipes;   //this recipes should be set equal to the recipes we are getting as an argument (where we store the array of recipes) [override the recipes above with these recipes]
    this.recipesChanged.next(this.recipes.slice());   //call recipesChanged, next and push a copy of our recipes with the slice method ==> inform all interested places in the app that we got new recipes   //use recipesChanged event & emit a new value- a copy of the recipes
  }

  getRecipes() { //getRecipes method to return the recipes array
    return this.recipes.slice(); // return recipes and call slice with no argument to return a new array which is a copy of the one in this service file => only get a copy
  }

  getRecipe(index: number) { //get a single recipe
    return this.recipes[index];          //return this recipes and select the index(id)
  }       //load a recipe item by id with getRecipe method which takes an id of type number


  addIngredientsToShoppingList(ingredients: Ingredient[]) { //receive ingredients of type Ingredient
    this.slService.addIngredients(ingredients);  //access the shopping list service and call addIngredients and pass ingredients to that service
  }

  addRecipe(recipe: Recipe) {     //get a recipe of type recipe
   this.recipes.push(recipe);     //take recipe array and push a rew recipe on it
   this.recipesChanged.next(this.recipes.slice());  //use recipesChanged event & emit a new value- a copy of the recipes
  }

  updateRecipe(index: number, newRecipe: Recipe) {  //get the index of the recipe I should I should update & the new recipe of type recipe
    this.recipes[index] = newRecipe;                //take recipes array at the index and set equal to new recipe
    this.recipesChanged.next(this.recipes.slice());  //use recipesChanged event & emit a new value- a copy of the recipes
  }

  deleteRecipe(index: number) {   //get the index of the recipe
    this.recipes.splice(index, 1);                      //use recipes array and call the splice method to splice at the index 1 element to remove it
    this.recipesChanged.next(this.recipes.slice());     //call recipesChanged & emit a copy of the updated recipes
  }
}
