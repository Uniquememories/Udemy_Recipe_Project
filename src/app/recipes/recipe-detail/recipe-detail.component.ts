import { RecipeService } from './../recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { } //inject the recipe service

  ngOnInit(): void {
  }

  onAddToShoppingList() { //call the method
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients); //access the recipeService and call the addIngredientToShoppingList method and pass in the ingredients of the recipe
  }

}
