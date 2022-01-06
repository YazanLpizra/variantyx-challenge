import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IExternalArticle } from '@common/interfaces';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    displayedColumns: string[] = ['type', 'id'];
    dataSource: MatTableDataSource<IExternalArticle>;

    constructor(private apiService: ApiService) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.apiService.getExternalArticles().subscribe(articles => {
            this.dataSource.data = articles;
        })
    }
}
