import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importez NgbModule, pas NgbModal

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NgbModule, // Utilisez NgbModule ici, pas NgbModal
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}