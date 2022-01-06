import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
