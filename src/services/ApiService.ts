import axios from 'axios';
import {IUser} from "../pages/LoginRegisterPage";
import {setUserCredentials} from "./AuthService";
import {IArticle, IArticleData, ILogin, IProfile} from "../store/types";

const API_URL = 'http://localhost:3000/api';

const ApiService = {

    async login(data: ILogin): Promise<IUser | undefined> {
        try {
            const response = await axios.post(`${API_URL}/users/login`, data);
            setUserCredentials( {
                username: response.data.user.username,
                token: response.data.user.token
            })
            return response.data;
        } catch (error) {
            console.error(error)
        }
    },

    async getUserProfile(username: string | undefined): Promise<IProfile | undefined> {
        try {
            const response = await axios.get(`${API_URL}/profiles/${username}`, { headers:  { 'Token': sessionStorage.getItem('token')}})
            return response.data;
        } catch (error) {
            console.error(error)
        }
    },

    async getAllArticles(): Promise<IArticleData | undefined> {
        try {
            const response = await axios.get(`${API_URL}/articles/?limit=20&offset=0`)
            return response.data;
        } catch (error) {
            console.warn(error)
        }
    },
    async getLinkedArticles(username: string | undefined): Promise<IArticleData | undefined> {
        try {
            const response = await axios.get(`${API_URL}/articles/?author=${username}&limit=20&offset=0`)
            return response.data;
        } catch (error) {
            console.warn(error)
        }
    },
    async getArticleBySlug(slug: string | undefined): Promise<IArticle | undefined> {
        try {
            const response = await axios.get(`${API_URL}/articles/${slug}`)
            return response.data;
        } catch (error) {
            console.warn(error)
        }
    },
    async getArticlesFeed(): Promise<IArticleData | undefined> {
        try {
            const response = await axios.get(`${API_URL}/articles/feed`, { headers:  { 'Authorization': `Token: ${sessionStorage.getItem('token')}`}})
            return response.data;
        } catch (error) {
            console.warn(error)
        }
    },

    // @todo follow endpoint doesn't work correctly on backend side, after sending follow, getting data are the same (false) but should be (true).
    async postFollowProfile(username: string | undefined): Promise<IProfile | undefined> {
        try {
            const response = await axios.post(`${API_URL}/profiles/${username}/follow`, {},{ headers:  { 'Authorization': `Token: ${sessionStorage.getItem('token')}`}})
            return response.data;
        } catch (error) {
            console.error(error)
        }
    },

};

export default ApiService;