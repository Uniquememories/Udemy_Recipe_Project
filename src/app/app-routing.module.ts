import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//register the routes with an array of JS objects where each object represents a route
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //redirect to /recipes //must add the pathMatch and set to full and only redirect if the full path is empty
  { path: 'recipes', component: RecipesComponent, children: [   //localhost:4200/recipes
    { path: '', component: RecipeStartComponent },  //empty path /recipies/nothing => default case
    { path: ':id', component: RecipeDetailComponent }, //dynamic segment added after /recipes (/recipes/id)
  ] },
    { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //import the RouterModule & call forRoot => pass appRoutes to configure router module Angular ships with
  exports: [RouterModule]  //export configured router
})
export class AppRoutingModule {

}
