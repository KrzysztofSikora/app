import {setAllArticles, setLinkedArticles, setProfile} from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getAllArticles, getLinkedArticles} from "../selectors/selectors";
import React, {useEffect, useState} from "react";
import ApiService from "../services/ApiService";
import Articles from "../components/Articles";
import Navbar from "../components/Navbar";
import {isSignIn} from "../services/AuthService";


const ArticleListPage = () => {
    const [yourFeed, setYourFeed] = useState<string>('disabled')
    const [activeTab, setActiveTab] = useState<string>('globalFeed');

    const dispatch = useDispatch();
    useEffect(() => {
        const getAllArticles = async () => {
            try {
                const result = await ApiService.getAllArticles();
                const loggedUser = sessionStorage.getItem('username');

                if (loggedUser) {
                    const userArticles = await ApiService.getLinkedArticles(loggedUser);
                    if (userArticles) {
                        dispatch(setLinkedArticles(userArticles))
                    }
                }


                if (result) {
                    dispatch(setAllArticles(result))
                }

            } catch (error) {
                console.error(error)
            }
        }
        getAllArticles()


        if (isSignIn()) {
            setYourFeed('');
        } else {
            setYourFeed('disabled')
        }


    }, [dispatch])

    const switchFeed = (feed: string) => {
        if(!feed) {
            feed = ''
        }
        if (isSignIn()) {
            setActiveTab(feed)
        }
    }

    return (
        <>
            <Navbar/>
            <div className="home-page">
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <a className={`nav-link ${yourFeed} ${activeTab === 'yourFeed' ? 'active' : ''}`}
                                           onClick={() => switchFeed('yourFeed')}>
                                            Your Feed
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${activeTab === 'globalFeed' ? 'active' : ''}`}
                                           onClick={() => switchFeed('globalFeed')}>
                                            Global Feed
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {activeTab === 'globalFeed' ? (<Articles selector={getAllArticles}/>) :
                                <Articles selector={getLinkedArticles}/>}

                        </div>

                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>

                                <div className="tag-list">
                                    <a href="" className="tag-pill tag-default">
                                        programming
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        javascript
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        emberjs
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        angularjs
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        react
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        mean
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        node
                                    </a>
                                    <a href="" className="tag-pill tag-default">
                                        rails
                                    </a>
                                </div>
                            </div>
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

export default ArticleListPage;