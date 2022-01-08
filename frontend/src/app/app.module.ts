import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ApiService } from './api.service';
import { ApiInterceptor } from './api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        ArticleListComponent,
        NotFoundComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule
    ],
    providers: [
        ApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
