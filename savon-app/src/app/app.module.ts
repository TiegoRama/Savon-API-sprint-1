import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientComponent } from './pages/ingredients/ingredients.component';
import { RecetteComponent } from './pages/recettes/recettes.component';
import { IngredientCreateComponent } from './pages/ingredient-create/ingredient-create.component';
import { IngredientListComponent } from './shared/ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './shared/ingredient-form/ingredient-form.component';
import { IngredientImportExportComponent } from './shared/ingredient-import-export/ingredient-import-export.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    IngredientComponent,
    RecetteComponent,
    IngredientCreateComponent,
    HttpClientModule,
    IngredientListComponent,
    IngredientFormComponent,
    IngredientImportExportComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]


})
export class AppModule { }

