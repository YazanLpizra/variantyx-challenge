import { IExternalArticle } from "@common/interfaces";
import axios from 'axios';

export class ArticleRetrieverService {
    // TODO: move to db?
    private static get typeUrlMappings(): Record<string, string> {
        return {
            'pubmed': 'https://pubmed.ncbi.nlm.nih.gov'
        };
    };

    static async fetchArticle(article: IExternalArticle) {
        const baseUrl = this.typeUrlMappings[article.type];
        if(!baseUrl) {
            throw new Error('Unknown article type. Could not fetch article.');
        }

        try {
            const result = await axios.get(`${baseUrl}/${article.id}`);
            return result;
        } catch(error){
            throw new Error('Error retrieving article from source. Could not fetch article.');
        }
    }
}