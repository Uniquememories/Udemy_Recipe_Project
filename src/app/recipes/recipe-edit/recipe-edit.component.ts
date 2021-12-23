import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;                                           //store the id w/ property name
  editMode = false;                                   //store edit recipe in new property set to false to assume we are creating a new recipe and not in edit mode
  recipeForm: FormGroup;                          //form is a property of type FormGroup (imported)

  constructor(private route: ActivatedRoute,
              private RecipeService: RecipeService) { }        //inject the activated route & recipeService

  ngOnInit(): void {
    this.route.params                                   //retrieve the id dynamically with route.params and subscribe to it
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];                      //set this id = to params[id] => use the + to convert it into a number
          this.editMode = params['id'] != null;
                                                        //assign a new value to edit mode and see if params has an id property => if not null checking if have an id => if not it will be undefined => will only be not undefined if we are in edit mode because an id will be present => if id is undefined and = to null will return false: is in new mode => /0/edit = new & /new = false
          // console.log(this.editMode);                   //check by logging in the console
          this.initForm();                            //call initForm whenever our route parms change to indicate that we reloaded the page
        }
      )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.RecipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  } //initialize recipe edit form => reach out to recipeForm property that is a new FormGroup to give the frame of the form => FormGroup takes a JS object with keyValue pairs for the controls to register
  //add logic to decide if in edit mode => //fetch recipe we are curently editing (recipeImagePath & recipeDescription)=> reaching out to recipeService and with getRecipe passing the id of the recipe we are editing => then the recipeName will access the recipe name & assign to our variable (recipeName) [same for recipeImagePath & recipeDescription]
  //Controls to register: name of the recipe -> a new form Control (imported) Need to decide if in edit mode or not to assign an initial value or not (create a variable [recipeName] to hold our recipe name and set to empty string by default) => assign recipeName as a default value (will either be a empty string or if in editMode will be recipeName). => same for imagePath & description

}
