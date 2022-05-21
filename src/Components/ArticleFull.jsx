import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import { patchArticle } from "../utils/api";
import CommentList from "./CommentList";
import { Button, Card, ButtonGroup } from "react-bootstrap";

function ArticleFull() {
  const [article, setArticle] = useState({});
  const [err, setErr] = useState("");
  const [votes, setVotes] = useState(0);

  let params = useParams();

  useEffect(() => {
    getArticleById(params.article_id)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
      })
      .catch((err) => {
        setErr("Article not found!");
      });
  }, [params.article_id]);

  const updateVotes = (article_id, updateCount) => {
    if (updateCount === 1) {
      setVotes(votes + 1);
    } else {
      setVotes(votes - 1);
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
    <section className="Full__article__container">
      <div className="Full__article__body">
        <Card bg="light" text="dark" className="Article__full">
          <Card.Header>{article.title}</Card.Header>
          <Card.Text>{article.body}</Card.Text>
          <Card.Text>
            <b>Votes:</b>
            {votes} | <b>Topic:</b> {article.topic} | <b>Author</b>:
            {article.author} | <b>CommentCount: </b>
            {article.comment_count}
          </Card.Text>
          <ButtonGroup>
            <Button
              className="button__group"
              variant="success"
              onClick={() => {
                updateVotes(params.article_id, 1);
              }}
            >
              Upvote
            </Button>
            <Button
              className="button__group"
              variant="danger"
              onClick={() => {
                updateVotes(params.article_id, -1);
              }}
            >
              Downvote
            </Button>
            <Button
              variant="secondary"
              as={Link}
              to={topicLink}
              className="button__group"
            >
              Related Articles
            </Button>
          </ButtonGroup>
        </Card>

        <CommentList />
      </div>
    </section>
  );
}

export default ArticleFull;
