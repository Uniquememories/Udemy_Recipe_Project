import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;     //store id

  constructor(private recipeService: RecipeService,             //inject the recipe service
              private route: ActivatedRoute) { }               //fetch id from the router => get access to the ActivatedRoute

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);    //fetch the new recipe using recipeService whenever id changes, call getRecipe & pass id as argument
        }
      )
  }
  //use route, params observable and subscribe to the observable => react to any changes in route params of type Params
  //set this id = params, id and cast to a number with a +

  onAddToShoppingList() { //call the method
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    //access the recipeService and call the addIngredientToShoppingList method and pass in the ingredients of the recipe
  }

}
