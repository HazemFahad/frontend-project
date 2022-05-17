import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import useCount from "../Hooks/useCount";
import { patchArticle } from "../utils/api";
import CommentList from "./CommentList";
import PostComment from "./PostComment";
import { Button, Card, ButtonGroup } from "react-bootstrap";

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
  }, [params.article_id, voteCount]);

  console.log();

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
      <Card bg="light" text="dark" className="Article__full">
        <Card.Header>{article.title}</Card.Header>
        <Card.Text>{article.body}</Card.Text>
        <Card.Text>
          <b>Votes:</b>
          {voteCount.count} | <b>Topic:</b> {article.topic} | <b>Author</b>:
          {article.author} | <b>CommentCount: </b>
          {article.comment_count}
        </Card.Text>
        <ButtonGroup>
          <Button
            variant="success"
            onClick={() => {
              updateVotes(params.article_id, 1);
            }}
          >
            Upvote
          </Button>
          <Button
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
            className="Topic__link"
          >
            Related Articles
          </Button>
        </ButtonGroup>
      </Card>

      <PostComment />
      <CommentList />
    </section>
  );
}

export default ArticleFull;
