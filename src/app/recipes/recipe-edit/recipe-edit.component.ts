import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;                                           //store the id w/ property name
  editMode = false;                                   //store edit recipe in new property set to false to assume we are creating a new recipe and not in edit mode

  constructor(private route: ActivatedRoute) { }        //inject the activated route

  ngOnInit(): void {
    this.route.params                                   //retrieve the id dynamically with route.params and subscribe to it
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];                      //set this id = to params[id] => use the + to convert it into a number
          this.editMode = params['id'] != null;
                                                        //assign a new value to edit mode and see if params has an id property => if not null checking if have an id => if not it will be undefined => will only be not undefined if we are in edit mode because an id will be present => if id is undefined and = to null will return false: is in new mode => /0/edit = new & /new = false
          // console.log(this.editMode);                   //check by logging in the console
        }
      )
  }

}
