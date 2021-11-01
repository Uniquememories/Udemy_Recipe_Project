import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { } //inject the recipeService =>listen to the event in the recipe service

  ngOnInit(): void {
    this.recipeService.recipeSelected //set up the lister
      .subscribe(  //on the recipeSelected subscribe to it and get informed about any changes
        (recipe: Recipe) => { //receive data of type recipe
          this.selectedRecipe = recipe; //set this.selectedRecipe to the recipe we got with the event
        }
      );
  }
}
