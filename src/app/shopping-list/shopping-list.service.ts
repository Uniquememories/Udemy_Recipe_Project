import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

//better approach over EventEmitter use Subject that we import (use when communication across components through services)=> using a subject is the preferred way unless using @Output

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();   //Added event emitter named ingredientsChanged that will emit our ingredient array
  ingredientsChanged = new Subject<Ingredient[]>();  //replacing EventEmitter with Subject
  startedEditing = new Subject<number>(); //a subject to listen to the shopping edit component => of type number
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice(); //return a copy of the ingredients with the slice method
  }

  getIngredient(index: number) { //get the index of the ingredient
    return this.ingredients[index];  //return the ingredient from the ingredient array at that index
  }
  //get the item/ingredient want to edit

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);  //access my ingredient and push my new ingredient
    // this.ingredientsChanged.emit(this.ingredients.slice());  //whenever we change the array we call this.ingredientsChanged, emit a new event and pass a value => a copy of the original ingredients array
    this.ingredientsChanged.next(this.ingredients.slice());   //to use Subject => change emit to next
  }

  //One option: addIngredients method where we will recieve our list of ingredients where we loop through the ingredients and call the ingredients for each ingredients
  addIngredients(ingredients: Ingredient[]) {
  //   for (let ingredient of ingredients) {
  //     this.addIngredient(ingredient);
  //   }
  //Second option: directly add all ingredients and then emit our event //access the ingredients, call the push method and use the spread operator (...) to turn the array of elements into a list of elements (spread operator spreads ingreadients into a list of single ingredients which are pushed into ingredients array) then we have to emit our ingredientsChanged and pass a copy of the ingredients
    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());     //to use Subject => change emit to next
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  //updateIngredient method => get the index number & get newIngredient of type Ingredient
  //reach out to ingredients & get the one with the index I want & set = to the newIngredient
  //call ingredientsChanged & emit my updated ingredients (just a slice of them)

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  //add deleteIngredient method => get the index number of where to delete
  //use ingredients array and splice one of the elements starting at a specific point: the index & splice one element(1) thus removing it
}

