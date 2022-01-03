import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,         //inject our service
              private router: Router,                        //inject the router to be able to navigate to the recipe want go to
              private route: ActivatedRoute) { }       //inform the router about our current route so can use the relative route (['new'])


  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    //listen to event => on recipesService & on recipesChanged => subscribe to the event => if it did change will receive a new array of recipes => & set the recipes = to the recipes that got passed here (store in subscription to destroy /unsubscribe when done)
    this.recipes = this.recipeService.getRecipes(); //get copy of recipes array
  }

  onNewRecipe() {                                 //onNewRecipe method to trigger click event in recipe-list.component html file
    this.router.navigate(['new'], {relativeTo: this.route});  //use router to target path want to go => already on /recipes since on recipe list => relative route
                                                              //add relativeTo configuration and point to this.route => the current route
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
