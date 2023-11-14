// actions.ts

import { createAction } from '@reduxjs/toolkit';
import {IArticle, IArticleData, IProfile} from "./types";
import {IUser} from "../pages/LoginRegisterPage";

export const setUserCredentials = createAction<IUser>('SET_USER_CREDENTIALS');
export const setProfile = createAction<IProfile>('SET_PROFILE');
export const setLinkedArticles = createAction<IArticleData>('SET_LINKED_ARTICLES');
export const setAllArticles = createAction<IArticleData>('SET_All_ARTICLES');
export const setSelectedArticle = createAction<IArticle>('SET_SELECTED_ARTICLE');
export const setFavoriteArticle = createAction<IArticleData>('SET_FAVORITE_ARTICLE');