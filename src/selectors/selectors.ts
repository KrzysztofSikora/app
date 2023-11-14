import { initialState } from "../store/reducers";
import {IArticle, IArticleData, RootState} from "../store/types";
import {createSelector} from "@reduxjs/toolkit";


const getState = (state: RootState) => state || initialState;
const getProfile = (state: RootState) => state.profile;
const getUserCredentials = (state: RootState) => state.user;
const getAllArticles = (state: RootState): IArticleData => state.articles;
const getLinkedArticles = (state: RootState): IArticleData => state.linkedArticles;
const getSelectedArticle = (state: RootState) => state.selectedArticle.article
const getFavoriteArticle = (state: RootState) => state.favoriteArticles



export {
    getState,
    getProfile,
    getUserCredentials,
    getAllArticles,
    getLinkedArticles,
    getSelectedArticle,
    getFavoriteArticle
}