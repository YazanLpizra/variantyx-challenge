export interface IExternalArticle {
    type: 'pubmed' | 'omim' | 'hgmd',
    id: string;
}

export const AllowedArticleTypesList = ['pubmed', 'omim', 'hgmd'] as const;
export type AllowedArticleTypes = typeof AllowedArticleTypesList[number];
