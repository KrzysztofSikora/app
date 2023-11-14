import React, {useEffect, useState} from "react";
import apiService from "../services/ApiService";
import {useDispatch, useSelector} from "react-redux";
import {setFavoriteArticle, setLinkedArticles, setProfile} from "../store/actions";
import {getFavoriteArticle, getLinkedArticles, getProfile} from "../selectors/selectors";
import ApiService from "../services/ApiService";
import LinkedArticles from "../components/Articles";
import {useParams} from "react-router-dom";
import {capitalizeFirstLetter} from "../helpers/helpers";
import placeholder from '../assets/placeholder.png';
import Navbar from "../components/Navbar";



export default function ProfilePage() {
  const [activeFavoriteLink, setFavoriteActiveLink] = useState('');
  const [activeMyArticleLink, setMyArticleLink] = useState('active');
  const [activeTab, setActiveTab] = useState<string>('myArticles');

  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const { username } = useParams();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result =  await ApiService.getUserProfile(username);
        const linkedArticles = await ApiService.getLinkedArticles(username);

        if (result) {
          dispatch(setProfile(result))
        }
        if (linkedArticles) {
          dispatch(setLinkedArticles(linkedArticles))
        }
      } catch (error) {
        console.error('api error:', error)
      }
    }
    getUserProfile();
  }, [dispatch, username]);

  const favoriteArticles = (tab: string) => {

    setActiveTab(tab)

    const getFavorite = async () => {
      try {
        const favoriteArticles = await ApiService.getArticlesFeed();
        if (favoriteArticles) {
          dispatch(setFavoriteArticle(favoriteArticles))

        }
      } catch (error) {
        console.warn('error', error)

      }
    }

    getFavorite()



  }
  const followProfile = (followUser: string) => {

    //@todo looks like BE doesn't update user profile
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
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={ profile.profile?.image || placeholder} className="user-img" />
                <h4>{ capitalizeFirstLetter(profile.profile?.username) || ''}</h4>
                <p>
                  {profile.profile?.bio || ''}
                </p>
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => followProfile(profile.profile?.username)}>
                  <i className="ion-plus-round" />
                  &nbsp; { capitalizeFirstLetter(profile.profile?.username) || ''}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'myArticles' ? 'active' : ''}`} onClick={() => favoriteArticles('myArticles')}>
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'favoriteArticles' ? 'active' : ''}`} onClick={() => favoriteArticles('favoriteArticles')}>
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>


              {activeTab === 'myArticles' ? (<LinkedArticles selector={getLinkedArticles}/>) : <LinkedArticles selector={getFavoriteArticle} /> }

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
