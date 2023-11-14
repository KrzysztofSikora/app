import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedArticle} from "../selectors/selectors";
import placeholder from "../assets/placeholder.png";
import {capitalizeFirstLetter, formatDate} from "../helpers/helpers";
import React, {useEffect} from "react";
import ApiService from "../services/ApiService";
import {setSelectedArticle} from "../store/actions";
import Navbar from "../components/Navbar";

export default function ArticlePage() {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const selectedArticle = useSelector(getSelectedArticle)

    useEffect(() => {
        const getSelectedArticle = async () => {
            try {
                const result = await ApiService.getArticleBySlug(slug);
                if (result) {
                    dispatch(setSelectedArticle(result));
                }
            } catch (error) {
                console.error('api error:, error')
            }
        }
        getSelectedArticle()
    }, [dispatch]);


    //@todo looks like BE side doesen't update profile
    const followProfile = (followUser: string) => {
        const followUserProfile = async () => {
            try {
               await ApiService.postFollowProfile(followUser);
            } catch (error) {
                console.error('api error:', error)
            }
        }
        followUserProfile()
    }
    return (
        <>
            <Navbar />
            <div className="article-page">
                <div className="banner">
                    <div className="container">
                        <h1>{selectedArticle?.title}</h1>

                        <div className="article-meta">
                            <a href={`/#/profile/${selectedArticle?.author.username || ''}`}>

                                <img src={selectedArticle?.author.image || placeholder} className="user-img"/>
                            </a>
                            <div className="info">
                                <a href={`/#/profile/${selectedArticle?.author.username || ''}`} className="author">
                                    {capitalizeFirstLetter(selectedArticle?.author.username) || ''}
                                </a>
                                <span className="date">{formatDate(selectedArticle?.createdAt)}</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => followProfile(selectedArticle.author?.username)}>
                                <i className="ion-plus-round"/>
                                &nbsp; Follow {capitalizeFirstLetter(selectedArticle?.author.username) || ''} <span
                                className="counter"></span>
                            </button>
                            &nbsp;&nbsp;
                            <button className="btn btn-sm btn-outline-primary">
                                <i className="ion-heart"/>
                                &nbsp; Favorite Post <span className="counter">{selectedArticle?.favoritesCount}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-md-12">
                            <p>{selectedArticle?.body || ''}</p>
                        </div>
                    </div>

                    <hr/>

                    <div className="article-actions">
                        <div className="article-meta">
                            <a href={`/#/profile/${selectedArticle?.author.username || ''}`}>
                                <img src={selectedArticle?.author.image || placeholder} className="user-img"/>
                            </a>
                            <div className="info">
                                <a href={`/#/profile/${selectedArticle?.author.username || ''}`} className="author">
                                    {capitalizeFirstLetter(selectedArticle?.author.username) || ''}
                                </a>
                                <span className="date">{formatDate(selectedArticle?.createdAt)}</span>
                            </div>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => followProfile(selectedArticle.author?.username)}>
                                <i className="ion-plus-round"/>
                                &nbsp; Follow {capitalizeFirstLetter(selectedArticle?.author.username) || ''}
                            </button>
                            &nbsp;
                            <button className="btn btn-sm btn-outline-primary">
                                <i className="ion-heart"/>
                                &nbsp; Favorite Post <span className="counter">{selectedArticle?.favoritesCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="container">
                    <a href="/#" className="logo-font">
                        conduit
                    </a>
                    <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
                </div>
            </footer>
        </>
    );
}
