import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { IngredientComponent } from './pages/ingredients/ingredients.component'
import { RecetteComponent } from './pages/recettes/recettes.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'confidentialite', component: PrivacyPolicyComponent },
  { path: 'ingredients', component: IngredientComponent },
  {path:'recettes', component: RecetteComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
