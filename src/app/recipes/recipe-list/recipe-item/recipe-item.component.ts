import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number; //to get the id => can pass in the index of the item from outside the recipe-list component 

  // constructor(private recipeService: RecipeService) { } //inject recipe service

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe); //use recipeSelected eventemitter and call emit to emit the recipe of the recipe item component, the data we want to pass
  // }

}
