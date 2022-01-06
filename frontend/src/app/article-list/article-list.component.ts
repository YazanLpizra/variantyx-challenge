import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { IExternalArticle } from '@common/interfaces';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ArticleListComponent implements OnInit {

    displayedColumns: string[] = ['type', 'id'];
    dataSource: MatTableDataSource<IExternalArticle>;

    abstract?: string;
    expandedArticle?: IExternalArticle;
    loading: boolean;

    constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
        this.dataSource = new MatTableDataSource();
        this.loading = false;
    }

    ngOnInit(): void {
        this.apiService.getExternalArticles().subscribe(articles => {
            this.dataSource.data = articles;
        });
    }

    getAbstract(article: IExternalArticle) {
        this.loading = true;
        this.abstract = '';
        this.expandedArticle = this.expandedArticle === article
            ? undefined
            : article;

        this.apiService.getArticleAbstract(article).subscribe(
            (result: { abstract: string, message: string }) => {
                this.abstract = result.abstract;
                this.loading = false;
            },
            error => {
                console.log(error);
                this.snackBar.open(error.error.message, 'Okay', { duration: 3 * 1000 });
                this.loading = false;
            }
        );
    }
}
