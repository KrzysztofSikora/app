import {IUser} from "../pages/LoginRegisterPage";

export interface ILogin {
    user: {
        name: string,
        email: string,
        password: string
    }
}

export interface IProfile {
    profile: {
        bio: string;
        following: boolean;
        image: string;
        username: string;
    }
}

export interface IAuthor {
    bio: string;
    following: boolean;
    image: string;
    username: string;
}
export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: IAuthor;
}


export interface ISelectedArticle {
    article: IArticle
}


export interface IArticleData {
    articles: IArticle[];
    articlesCount: number;
}


export interface RootState {
    user: IUser;
    profile: IProfile;
    articles: IArticleData;
    linkedArticles: IArticleData;
    selectedArticle: ISelectedArticle;
    favoriteArticles: IArticleData;
}