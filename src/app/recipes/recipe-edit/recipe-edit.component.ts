import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;                                      //store the id w/ property name
  editMode = false;                                //store edit recipe in new property set to false to assume we are creating a new recipe and not in edit mode
  recipeForm: FormGroup;                          //form is a property of type FormGroup (imported)

  constructor(private route: ActivatedRoute,
              private RecipeService: RecipeService,     //inject the activated route & recipeService
              private router: Router) { }

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
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    //newRecipe which is a new Recipe (import) & add all data needed to create a new recipe => access it on the recipeForm& the value where we will have the name, description, imagePath, & ingredients *** NOT NEEDED since recipeForm.value has all the data needed to create a new recipe ***
    if (this.editMode) {
      // this.RecipeService.updateRecipe(this.id, newRecipe);
      this.RecipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      // this.RecipeService.addRecipe(newRecipe);
      this.RecipeService.addRecipe(this.recipeForm.value);
    }
    //check if in edit mode => & if in edit mode on the recipeService call updateRecipe & pass the id of recipe updating & the new recipe // or if not in edit mode call recipeService to addRecipe & add the newRecipe
    this.onCancel(); //after submitting the form we are done and want to navigate away, same as onCancel
    // console.log(this.recipeForm);     //onSubmit method => log the recipeForm to the console
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required), //empty defalut validator & a required validator
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) //Empty default validator (null), required validator, & pattern validator to only allow positive numbers => enter validator between 2 forward slashes //
        ])
      })
    );
    //access recipe form and get ingredients control / cast it as a FormArray & push a new form group with group of inputs name & amounts without initial values
  }

  onDeleteIngredient(index: number) {   //will receive the index
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
      //get access to recipeForm to call get method and get access to ingredienta (which is a formArray) => call removeAt and pass the index to remove specific form control at the position want to delete
    // (<FormArray>this.recipeForm.get('ingredients')).clear();
      //Another way to clear all items in a FormArray
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    //navigate away => access the router and navigate (go up one level) => if editing take back to detail page // click on new button take back to recipe page => need to tell Angular what current route is with relativeTo: this.route
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.RecipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)  //pattern validator to only allow positive numbers => enter validator between 2 forward slashes //
              ])
            })
          );
        }
      }
      //in edit mode we override the default variables => check if recipe that is loaded does have ingredients & loop through the single ingredients of the recipe ingredients & push them onto the recipeIngredients form array & push a new FormGroup with new name & amount FormControls that control a single ingredient
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required), //required validator
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  } //initialize recipe edit form => reach out to recipeForm property that is a new FormGroup to give the frame of the form => FormGroup takes a JS object with keyValue pairs for the controls to register
  //add logic to decide if in edit mode => //fetch recipe we are curently editing (recipeImagePath & recipeDescription)=> reaching out to recipeService and with getRecipe passing the id of the recipe we are editing => then the recipeName will access the recipe name & assign to our variable (recipeName) [same for recipeImagePath & recipeDescription]
  //Controls to register: name of the recipe -> a new form Control (imported) Need to decide if in edit mode or not to assign an initial value or not (create a variable [recipeName] to hold our recipe name and set to empty string by default) => assign recipeName as a default value (will either be a empty string or if in editMode will be recipeName). => same for imagePath & description
  //assign ingredients to recipeIngredients which is a FormGroup above with an array of FormControls

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  //Outsource the "get the controls" logic into a getter of the component code

}


