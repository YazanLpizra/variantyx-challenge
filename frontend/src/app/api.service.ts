import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExternalArticle } from '@common/interfaces';
import { Observable } from 'rxjs';

class Endpoints {
    static getAllArticles() { return `/api/articles`; }
    static getArticleAbstract({ type, id }: IExternalArticle) { return `/api/articles/${type}/${id}/abstract`; }
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getExternalArticles(): Observable<IExternalArticle[]> {
        return this.http.get<IExternalArticle[]>(Endpoints.getAllArticles());
    }

    getArticleAbstract(article: IExternalArticle): Observable<{abstract: string, message: string}> {
        return this.http.get<{abstract: string, message: string}>(Endpoints.getArticleAbstract(article));
    }
}
