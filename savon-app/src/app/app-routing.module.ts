import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { IngredientComponent } from './pages/ingredients/ingredients.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { AjouterIngredientComponent } from './pages/ingredient-create/ingredient-create.component';
import { IngredientManagerPageComponent } from './pages/ingredient-management-page/ingredient-management-page.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'confidentialite', component: PrivacyPolicyComponent},
  {path: 'ingredients', component: IngredientComponent},
  {path: 'recettes', component: RecettesComponent},
  {path: 'createingredient', component: AjouterIngredientComponent},
  {path: 'managementingredient', component: IngredientManagerPageComponent},
  {path: 'createrecette', component: RecetteCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }