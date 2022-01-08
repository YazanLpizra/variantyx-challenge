export interface IExternalArticle {
    type: 'pubmed' | 'omim' | 'hgmd',
    id: string;
}

export const AllowedArticleTypes = ['pubmed', 'omim', 'hgmd'] as const;
export type AllowedArticleTypes = typeof AllowedArticleTypes[number];
