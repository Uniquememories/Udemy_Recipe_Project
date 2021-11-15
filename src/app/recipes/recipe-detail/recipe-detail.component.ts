import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;     //store id in property

  constructor(private recipeService: RecipeService,             //inject the recipe service
              private route: ActivatedRoute,                    //fetch id from the router => get access to the ActivatedRoute
              private router: Router) { }                     //get access to the router so call can call the navigate method

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

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //use router to navigate to current id & then edit (id property is needed above to inject here)relativeTo configuration to point to current route
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})    //alternate way: move up one level ../ and then add this.id then edit => relativeto current route => make a more complex path
  }

}
