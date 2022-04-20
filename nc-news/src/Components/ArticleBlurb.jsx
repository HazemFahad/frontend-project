import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles, getTopics } from "../utils/api";
import { useParams } from "react-router-dom";

function ArticleBlurb() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    getArticles()
      .then((articleArr) => {
        if (params.topic !== undefined) {
          const filteredItems = articleArr.filter((article) => {
            return article.topic.toLowerCase() === params.topic.toLowerCase();
          });
          setArticles(filteredItems);
        } else {
          setArticles(articleArr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  useEffect(() => {
    getTopics()
      .then((topicsArr) => {
        setTopics(topicsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   console.log(articles);
  return (
    <main>
      <h3>Filter By:</h3>
      <div className="Topic__bar">
        <nav>
          {topics.map(({ slug, description }) => {
            return (
              <Link to={`/${slug}`} key={`${slug}`} className="Topic__link">
                {slug} - {description}
              </Link>
            );
          })}
          <Link to="/" key="home" className="Topic__link">
            Remove Filter
          </Link>
        </nav>
      </div>

      <ul>
        {articles.map((article) => {
          const topicLink = `/${article.topic}`;
          return (
            <li key={article.article_id} className="Article__blurb">
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p>Votes: {article.votes}</p>
              <p>Topic: {article.topic}</p>
              <a href={topicLink}>
                <button>Related Articles</button>
              </a>
              <a>
                <button>Read Full Article</button>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default ArticleBlurb;
