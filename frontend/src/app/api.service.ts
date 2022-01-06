import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExternalArticle } from '@common/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getExternalArticles(): Observable<IExternalArticle[]> {
        return of([
            { type: 'pubmed', id: '7683628' },
            { type: 'pubmed', id: '18456578' },
            { type: 'pubmed', id: '20021716' },
            { type: 'pubmed', id: '22658665' },
            { type: 'pubmed', id: '22975760' },
            { type: 'pubmed', id: '23891399' },
            { type: 'pubmed', id: '23974870' },
            { type: 'pubmed', id: '25087612' },
            { type: 'pubmed', id: '27171515' },
            { type: 'pubmed', id: '28546993' },
        ]);
    }

    getArticleAbstract(article: IExternalArticle): Observable<string> {
        return of('');
    }
}
