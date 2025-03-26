import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { IngredientComponent } from './pages/ingredients/ingredients.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { AjouterIngredientComponent } from './pages/ingredient-create/ingredient-create.component';
import { IngredientListComponent } from './shared/ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './shared/ingredient-form/ingredient-form.component';
import { IngredientImportExportComponent } from './shared/ingredient-import-export/ingredient-import-export.component';
import { IngredientManagerPageComponent } from './pages/ingredient-management-page/ingredient-management-page.component';
import { RadarChartComponent } from './shared/radar-chart/radar-chart.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';
import { ModalIngredientPickerComponent } from './shared/modal-ingredient-picker/modal-ingredient-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    IngredientComponent,
    RecettesComponent,
    AjouterIngredientComponent,
    IngredientListComponent,
    IngredientFormComponent,
    IngredientImportExportComponent,
    IngredientManagerPageComponent,
    RadarChartComponent,
    RecetteCreateComponent,
    ModalIngredientPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(), 
    provideHttpClient(withFetch())  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }