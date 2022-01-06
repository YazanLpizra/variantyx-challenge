import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ApiService } from './api.service';
import { ApiInterceptor } from './api.interceptor';

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
