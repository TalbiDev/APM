import { WelcomeComponent } from './home/welcome.component';
import { HttpClientModule } from '@angular/common/http';;
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'welcome' },
      { path: '**', pathMatch: 'full', redirectTo: 'welcome' },
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
