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
}

