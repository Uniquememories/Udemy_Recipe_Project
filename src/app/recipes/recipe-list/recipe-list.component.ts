import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,         //inject our service
              private router: Router,                        //inject the router to be able to navigate to the recipe want go to
              private route: ActivatedRoute) { }       //inform the router about our current route so can use the relative route (['new'])


  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); //get copy of recipes array
  }

  onNewRecipe() {                                 //onNewRecipe method to trigger click event in recipe-list.component html file
    this.router.navigate(['new'], {relativeTo: this.route});  //use router to target path want to go => already on /recipes since on recipe list => relative route
                                                              //add relativeTo configuration and point to this.route => the current route
  }

}
