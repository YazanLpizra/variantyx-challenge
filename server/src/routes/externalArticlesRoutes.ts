import express from 'express';
import { MockExternalArticlesDaoService } from '../services';

const externalArticlesRouter = express.Router()

// GET all articles
externalArticlesRouter.get('/', async function (req, res) {
    const articles = await MockExternalArticlesDaoService.getAllArticles();
    res.status(200).json(articles);
});

// GET transform by id
externalArticlesRouter.get('/:id/abstract', function (req, res) {
    res.status(200);
});

export default externalArticlesRouter;
