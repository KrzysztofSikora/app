import {useSelector} from "react-redux";
import {IArticleData, RootState} from "../store/types";
import {capitalizeFirstLetter, formatDate} from "../helpers/helpers";
import placeholder from "../assets/placeholder.png";
import ApiService from "../services/ApiService";

const Articles = ({selector}: { selector: (state: RootState) => IArticleData }) => {

    const articles = useSelector(selector);

    return (
        <>
            {articles && articles.articles?.map((article) =>
                (
                    <div key={article.title} className="article-preview">
                        <div className="article-meta">
                            <a href={`/#/profile/${article.author.username || ''}`} >
                                <img src={article?.author.image || placeholder}/>
                            </a>

                            <div className="info">
                                <a href={`/#/profile/${article.author.username || ''}`} className="author" >
                                    {capitalizeFirstLetter(article?.author.username) || ''}
                                </a>
                                <span className="date">{formatDate(article?.createdAt)}</span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"/> {article?.favoritesCount}
                            </button>
                        </div>
                        <a href={`#/${article.slug}`} className="preview-link">
                            <h1>{article.title || ''}</h1>
                            <p>{article.description}</p>
                            <p></p>
                            <span>Read more...</span>
                        </a>
                    </div>
                )
            )
            }
        </>
    )
}

export default Articles;