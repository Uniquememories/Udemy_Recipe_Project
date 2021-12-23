import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm //get access to the form (reach out to f) => is the shopping list form (slForm) of type NgForm
  subscription: Subscription;  // store the startedEditing subscriptions
  editMode = false; //Are we editing?? default to false until method is called and we are editing
  editedItemIndex: number; //store the index of the item editing
  editedItem: Ingredient; //store the ingredient

  constructor(private slService: ShoppingListService) { } //access the ShoppingListService and inject slService

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);  //editedItem set = to (reaching out to) shopping list service (slService), to the item get from getIngredient method & pass the index of that ingredient
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }) //reach out to slForm and call setValue => assign a new value for name & amount: use editedItem to reach out to name & amount
        }
      );
    //inject the shopping list service (slService) => subscribe to the startedEditing subject => receive the index of type number of the item to edit // set editMode to true (because we are editing)=> store the index of item editing (editItemIndex) & store the subscription (this.subscription)
  }

  onSubmit(form: NgForm) {  //get the form of type NgForm (used to be onAddItem changed to onSubmit)
    const value = form.value; //get value of the form on the value property
    const newIngredient = new Ingredient(value.name, value.amount); //use value to access the name & amount of ingredient
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);  //reach out to slService and add a new ingredient to it
    }
    //call the method if in edit mode with an if expression to check our mode => if editMode is true, reach out to shopping list service (slService) & call updateIngredient => pass the editedItemIndex & the newIngredient => otherwise/else call add ingredient.
    this.editMode = false; //switch editMode back to false for resetting the form
    form.reset();    //reset the form with form.reset()
  }

  onClear() {  //on clear method
    this.slForm.reset();
    this.editMode = false;
  } //to clear form input w/ clear button => get access to form with this.slForm and reset it => & set the editMode back to false

  onDelete() { //on delete method => remove one of the items in the ingredients array
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  } //reach out to shopping list service and call deleteIngredient & pass the editedItemIndex as a value
  //call this.onClear method to clear the form when deleting an item

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  } //neOnDestroy used to clean up the subscription with unsubscribe (so dont create a memory leak) => should always be last method
}
