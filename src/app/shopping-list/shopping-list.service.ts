import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();   //Added event emitter named ingredientsChanged that will emit our ingredient array

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice(); //return a copy of the ingredients with the slice method
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);  //access my ingredient and push my new ingredient
    this.ingredientsChanged.emit(this.ingredients.slice());  //henever we change the array we call this.ingredientsChanged, emit a new event and pass a value => a copy of the original ingredients array
  }

  //One option: addIngredients method where we will recieve our list of ingredients where we loop through the ingredients and call the ingredients for each ingredients
  addIngredients(ingredients: Ingredient[]) {
  //   for (let ingredient of ingredients) {
  //     this.addIngredient(ingredient);
  //   }
  //Second option: directly add all ingredients and then emit our event //access the ingredients, call the push method and use the spread operator (...) to turn the array of elements into a list of elements (spread operator spreads ingreadients into a list of single ingredients which are pushed into ingredients array) then we have to emit our ingredientsChanged and pass a copy of the ingredients
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  
}

