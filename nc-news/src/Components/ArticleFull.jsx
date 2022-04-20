import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleArticle, getTopics } from "../utils/api";
import { useParams } from "react-router-dom";

function ArticleFull() {
  const [article, setArticle] = useState({});
  // const [topics, setTopics] = useState([]);

  let params = useParams();
  console.log(params);

  useEffect(() => {
    getSingleArticle(params.article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.article_id]);

  const topicLink = `/${article.topic}`;

  return (
    <div>
      <h3>{article.title}</h3>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <p>Topic: {article.topic}</p>
      <Link to={topicLink} className="Topic__link">
        <button>Related Articles</button>
      </Link>
    </div>
  );
}

export default ArticleFull;
