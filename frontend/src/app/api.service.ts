import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExternalArticle } from '@common/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';

class Endpoints {
    static getAllArticles() { return `/api/articles`; }
    static getArticleAbstract({ type, id }: IExternalArticle) { return `/api/articles/${type}/${id}/abstract`; }
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    // overkill for this usecase
    articles$: BehaviorSubject<IExternalArticle[]>;

    constructor(private http: HttpClient) { 
        this.articles$ = new BehaviorSubject<IExternalArticle[]>([]);
        this.loadExternalArticles().subscribe();
    }

    loadExternalArticles(): Observable<IExternalArticle[]> {
        return this.http.get<IExternalArticle[]>(Endpoints.getAllArticles())
            .pipe(
                tap(articles => this.articles$.next(articles))
            );
    }

    getArticleAbstract(article: IExternalArticle): Observable<{abstract: string, message: string}> {
        return this.http.get<{abstract: string, message: string}>(Endpoints.getArticleAbstract(article));
    }
}
