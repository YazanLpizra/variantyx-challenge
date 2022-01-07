import { IExternalArticle } from "@common/interfaces";
import { MongoClient, Collection } from 'mongodb'

export class ExternalArticlesService {

    private static _externalArticlesCollection: Collection<IExternalArticle>;
    private static async getCollectionInstance(): Promise<Collection<IExternalArticle>> {
        if (this._externalArticlesCollection) {
            return this._externalArticlesCollection
        }

        const uri = process.env.DB_URI;
        if (!uri) {
            throw new Error("Could not connect to database. No URI was provided");
        }
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db('variantyx');
        this._externalArticlesCollection = db.collection<IExternalArticle>('external_articles');

        // if collection is empty, seed it
        if(await this._externalArticlesCollection.countDocuments() === 0) {
            await this._externalArticlesCollection.insertMany([
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

        return this._externalArticlesCollection;
    }

    static async getAllArticles(): Promise<IExternalArticle[]> {
        const collection = await this.getCollectionInstance();
        const results = await collection.find().toArray();
        return results;
    }
}