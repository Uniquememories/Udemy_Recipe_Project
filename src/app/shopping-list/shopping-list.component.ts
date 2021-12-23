import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]; //set to an uninitialized property
  private igChangeSub: Subscription;  //store the subscription in igChangeSub property so can clean it up with OnDestroy

  constructor(private slService: ShoppingListService) { } //inject the ShoppingListService and bind to property name slService

  ngOnInit(): void { //do all initializations in ngOnInit
    this.ingredients = this.slService.getIngredients(); //assign ingredients to whatever the shopping list service (slService) returns whenever call getIngredients
    this.igChangeSub = this.slService.ingredientsChanged //reach out to shoppinglistservice (slService) and subscribe to the ingredients changed event  => store the subscription with igChangeSub property
      .subscribe(
        (ingredients: Ingredient[]) => { //ingredient array
          this.ingredients = ingredients; //set this.ingredients equal to the ingredients got
        }
      );
  }

  onEditItem(index: number) {  //method in html edit items in shopping list => get the index (id of the ingredient) type number (pass on the index to startedEditing subject)
    this.slService.startedEditing.next(index);  //reach out to the shopping list service(slService) and use the startedEditing property (the subject) from ts file => emit a new value the index
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe(); //use igChangeSub property to unsubscribe
  }
}
