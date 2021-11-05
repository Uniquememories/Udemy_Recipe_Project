import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>(); //recipeSelected property an object instantated by using EventEmitter and will hold recipe data

  private recipes: Recipe[] = [ //recipes array
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://steemitimages.com/p/o1AJ9qDyyJNSpZWhUgGYc3MngFqoAMfAtHcWN7TdVVgaqxn1U?format=match&mode=fit&width=640',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else do you need to say?',
      'https://cdn-cmjom.nitrocdn.com/FpMsHpAgoVrRMnuAdmBhGkyiizdsWlSU/assets/static/optimized/rev-0223ca3/wp-content/uploads/2019/08/fb19_original-fatburger.png.webp',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]),
  ];

  constructor(private slService: ShoppingListService) {} //inject the slService in the constructor (add @Injectable() to inject)

  getRecipes() { //getRecipes method to return the recipes arra
    return this.recipes.slice(); // return recipes and call slice with no argument to return a new array which is a copy of the one in this service file => only get a copy
  }

  getRecipe(index: number) {
    return this.recipes[index];          //return this recipes and select the index(id)
  }       //load a recipe item by id with getRecipe method which takes an id of type number


  addIngredientsToShoppingList(ingresients: Ingredient[]) { //receive ingredients of type Ingredient
    this.slService.addIngredients(ingresients);  //access the shopping list service and call addIngredients and pass ingredients to that service
  }
}
