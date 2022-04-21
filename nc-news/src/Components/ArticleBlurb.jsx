import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import { useParams } from "react-router-dom";
import TopicBar from "./TopicBar";

function ArticleBlurb() {
  const [articles, setArticles] = useState([]);
  let params = useParams();

  /*can pass 'topic' as a parameter here and do the 'filtering' for topics here
e.g if topic exists then add a query to the path ("/api/articles/?topic=£{topic}
then you wouldn't need all the filter logic in ArticleBlurb */

  /* 
could make use of useParams here and pass into getArticles a topic (please see api in utils for more info)
*/

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

  return (
    <main>
      <TopicBar />

      <ul>
        {articles.map((article) => {
          const topicLink = `/${article.topic}`;
          const articleLink = `/article/${article.article_id}`;
          return (
            <li key={article.article_id} className="Article__blurb">
              <h3>{article.title}</h3>
              <p>{article.body}</p>
              <p>Votes: {article.votes}</p>
              <p>Author: {article.author}</p>
              <p>Topic: {article.topic}</p>
              <Link to={topicLink} className="Topic__link">
                <button>Related Articles</button>
              </Link>
              <Link to={articleLink} className="Article__link">
                <button>Read Full Article</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default ArticleBlurb;
