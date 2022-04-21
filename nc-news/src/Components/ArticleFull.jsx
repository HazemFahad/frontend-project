import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import useCount from "../Hooks/useCount";
import { patchArticle } from "../utils/api";
import CommentList from "./CommentList";

function ArticleFull() {
  const [article, setArticle] = useState({});
  const [err, setErr] = useState("");
  const voteCount = useCount();

  let params = useParams();

  useEffect(() => {
    getArticleById(params.article_id)
      .then((article) => {
        setArticle(article);
        voteCount.setCount(article.votes);
      })
      .catch((err) => {
        setErr("Article not found!");
      });
  }, [params.article_id]);

  const updateVotes = (article_id, updateCount) => {
    if (updateCount === 1) {
      voteCount.incCount();
    } else {
      voteCount.decCount();
    }
    patchArticle(article_id, updateCount);
  };

  const topicLink = `/${article.topic}`;

  if (err) {
    return (
      <section className="Full__article">
        <p>{err}</p>
      </section>
    );
  }
  return (
    <section className="Full__article">
      <h3>{article.title}</h3>
      <p>{article.body}</p>
      <p>Votes: {voteCount.count}</p>
      <p>Topic: {article.topic}</p>
      <button
        onClick={() => {
          updateVotes(params.article_id, 1);
        }}
      >
        Upvote
      </button>
      <button
        onClick={() => {
          updateVotes(params.article_id, -1);
        }}
      >
        Downvote
      </button>
      <Link to={topicLink} className="Topic__link">
        <button>Related Articles</button>
      </Link>
      <CommentList />
    </section>
  );
}

export default ArticleFull;
