import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
    { path: 'articles', component: ArticleListComponent },
    { path: '', pathMatch: 'full', redirectTo: '/articles' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }