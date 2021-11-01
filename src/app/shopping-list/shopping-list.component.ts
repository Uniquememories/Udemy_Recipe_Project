import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]; //set to an uninitialized property

  constructor(private slService: ShoppingListService) { } //inject the ShoppingListService and bind to property name slService

  ngOnInit(): void { //do all initializations in ngOnInit
    this.ingredients = this.slService.getIngredients(); //assign ingredients to whatever the shopping list service (slService) returns whenever call getIngredients
    this.slService.ingredientsChanged //reach out to shoppinglistservice (slService) and subscribe to the ingredients changed event
      .subscribe(
        (ingredients: Ingredient[]) => { //ingredient array
          this.ingredients = ingredients; //set this.ingredients equal to the ingredients got
        }
      )
  }
}
