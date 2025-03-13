import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientComponent } from './pages/ingredients/ingredients.component';
import { RecetteComponent } from './pages/recettes/recettes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,
    IngredientComponent,
    RecetteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]


})
export class AppModule { }

