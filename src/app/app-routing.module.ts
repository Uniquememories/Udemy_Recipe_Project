import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

//register the routes with an array of JS objects where each object represents a route
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //redirect to /recipes //must add the pathMatch and set to full and only redirect if the full path is empty
  { path: 'recipes', component: RecipesComponent, children: [   //localhost:4200/recipes
    { path: '', component: RecipeStartComponent },  //empty path /recipies/nothing => default case
    { path: 'new', component: RecipeEditComponent }, //new path for edit recipes
    {
      path: ':id',
      component: RecipeDetailComponent,
      resolve: [RecipesResolverService]
    }, //dynamic segment added after /recipes (/recipes/id) => add resolve key(an array of resolvers) & add RecipesResolverService
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: [RecipesResolverService]
    }, //to have id available in the route to load it and have /edit to be clear we are in edit mode => add resolve key & add RecipesResolverService
  ] },
    { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], //import the RouterModule & call forRoot => pass appRoutes to configure router module Angular ships with
  exports: [RouterModule]  //export configured router
})
export class AppRoutingModule {

}
