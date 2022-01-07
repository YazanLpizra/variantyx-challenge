import { IExternalArticle } from "@common/interfaces";
import axios from 'axios';
import { createClient } from 'redis';
import { HtmlParserService } from ".";

export type RedisClientType = ReturnType<typeof createClient>;

export class ArticleRetrieverService {
    // TODO: move to db?
    private static get typeUrlMappings(): Record<string, string> {
        return {
            'pubmed': 'https://pubmed.ncbi.nlm.nih.gov'
        };
    };

    private static cacheClient: RedisClientType;
    private static async getCacheClient(): Promise<RedisClientType> {
        if (this.cacheClient) {
            return this.cacheClient;
        }

            const host = process.env.REDIS_HOST || ''
            const port = process.env.REDIS_PORT || ''
            const password = process.env.REDIS_PASS || '' 

        this.cacheClient = createClient({
            url: `redis://default:${password}@${host}:${port}`
        });

        await this.cacheClient.connect();
        console.log(await this.cacheClient.keys('*'))
        return this.cacheClient;

    }

    static async fetchArticleAbstract(article: IExternalArticle) {
        const baseUrl = this.typeUrlMappings[article.type];
        if (!baseUrl) {
            throw new Error('Unknown article type. Could not fetch article.');
        }

        // try to fetch from cache
        const cacheClient = await this.getCacheClient();
        const cachedAbstract = await cacheClient.get(article.id);
        if (cachedAbstract) {
            console.log('cachedAbstract found')
            return cachedAbstract;
        }

        try {
            const articlePageHtml = await axios.get(`${baseUrl}/${article.id}`);
            let abstract = HtmlParserService.queryHtmlBySelector(await articlePageHtml.data, '#enc-abstract');
            if (abstract) {
                abstract = abstract.toString();
            } else {
                throw new Error("No abstract found");
            }

            cacheClient.set(article.id, abstract);

            console.log('fetched abstract', abstract)

            return abstract;
        } catch (error) {
            throw new Error('Error retrieving article from source. Could not fetch article.');
        }
    }
}