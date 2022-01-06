import cors from 'cors';
import express from 'express';
import externalArticlesRouter from './routes/externalArticlesRoutes';

const app = express();
const port = 3001;

// middleware
app.use(cors());

// routes
app.use('/api/articles', externalArticlesRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});