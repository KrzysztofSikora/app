import { createReducer } from '@reduxjs/toolkit';
import {IArticle, IArticleData, IProfile} from "./types";
import {
    setAllArticles,
    setFavoriteArticle,
    setLinkedArticles,
    setProfile,
    setSelectedArticle,
    setUserCredentials
} from "./actions";
import {IUser} from "../pages/LoginRegisterPage";

export const initialState = {
    user: {} as IUser,
    profile: {} as IProfile,
    articles: {} as IArticleData,
    linkedArticles: {} as IArticleData,
    selectedArticle: {} as IArticle,
    favoriteArticles: {} as IArticleData,
};

const rootReducer = createReducer(initialState, (builder) => {
    builder.addCase(setUserCredentials, (state, action) => {
        state.user = action.payload;
    });
    builder.addCase(setProfile, (state, action) => {
        state.profile = action.payload;
    });
    builder.addCase(setAllArticles, (state, action) => {
        state.articles = action.payload;
    });
    builder.addCase(setLinkedArticles, (state, action) => {
        state.linkedArticles = action.payload;
    });
    builder.addCase(setSelectedArticle, (state, action) => {
        state.selectedArticle = action.payload;
    });
    builder.addCase(setFavoriteArticle, (state, action) => {
        state.favoriteArticles = action.payload;
    });
});

export default rootReducer;