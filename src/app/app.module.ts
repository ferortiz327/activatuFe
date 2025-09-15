import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';

import { HttpClientModule } from '@angular/common/http';
import { YoutubeServiceService } from './services/youtube-service.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './shared/material/material.module';

import { LOCALE_ID } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbAccordionModule,
    MaterialModule,
    NgbNavModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [YoutubeServiceService,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
