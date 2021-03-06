import { AllowedArticleTypes, IExternalArticle } from '@common/interfaces';
import express from 'express';
import { ExternalArticlesService, ArticleRetrieverService, HtmlParserService } from '../services';

const externalArticlesRouter = express.Router()

// GET all articles
externalArticlesRouter.get('/', async function (req, res) {
    const articles = await ExternalArticlesService.getAllArticles();
    res.status(200).json(articles);
});

// GET transform by id
externalArticlesRouter.get('/:type/:id/abstract', async function (req, res) {
    const { type, id } = req.params;

    // const isValidType = function(_type: string): _type is AllowedArticleTypes { 
    //     // AllowedArticleTypesList.includes(_type) doesnt work because list is defined as readonly/const
    //     return AllowedArticleTypesList.findIndex(_allowedType => _allowedType === _type) !== -1; 
    // }

    let article: IExternalArticle;
    if ([''].includes(type)) {
        article = { type: type as any, id };
    } else {
        res.status(400).json({ message: 'Error: Invalid type passed in url' });
        return;
    }

    try {
        const abstract = await ArticleRetrieverService.fetchArticleAbstract(article);

        if (!abstract) {
            return res.status(400).json({
                message: 'Error: Abstract could not be fetched for the article',
                abstract: null
            });
        }

        res.status(200).json({
            message: 'success!',
            abstract
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error: ' + error,
            abstract: null
        });
    }
});

export default externalArticlesRouter;
