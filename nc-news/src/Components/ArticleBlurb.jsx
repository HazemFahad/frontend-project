import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import { useParams } from "react-router-dom";
import TopicBar from "./TopicBar";

function ArticleBlurb() {
  const [articles, setArticles] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrder, setSelectedOrder] = useState("desc");

  const params = useParams();

  const topicParam = params.topic ? `&topic=${params.topic}` : "";

  useEffect(() => {
    getArticles(topicParam, selectedSortBy, selectedOrder)
      .then((articleArr) => {
        setArticles(articleArr);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [params, selectedSortBy, selectedOrder, topicParam]);

  console.log(selectedSortBy);

  return (
    <main>
      <TopicBar />
      <section>
        <label htmlFor="sort__by">Sort By:</label>

        <select
          value={selectedSortBy}
          onChange={(e) => {
            setSelectedSortBy(e.target.value);
          }}
          id="sort__by"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="order">Order:</label>

        <select
          value={selectedOrder}
          onChange={(e) => {
            setSelectedOrder(e.target.value);
          }}
          id="order"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </section>
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
              <p>Comment Count: {article.comment_count}</p>
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
