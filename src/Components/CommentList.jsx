import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, deleteCommentByID } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState("");
  const [isDeleting, setIsDeleting] = useState(true);
  const { user } = useContext(UserContext);

  const { article_id } = useParams();

  useEffect(() => {
    getCommentsById(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
      })
      .catch((err) => {
        setErr("Comments not found!");
      });
  }, [article_id]);

  const deleteComment = (comment_id) => {
    setComments((currComments) => {
      return currComments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    deleteCommentByID(comment_id)
      .then(() => {
        setIsDeleting(true);
      })
      .catch((err) => {
        setErr("Could not delete comment - Please try again!");
      });
  };

  if (err) {
    return (
      <section className="Comment__list">
        <p>{err}</p>
      </section>
    );
  }
  return (
    <div className="Comment__list__container">
      <section className="Comment__list">
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="Comment__item">
                <Card bg="light" text="dark">
                  <Card.Text>
                    <b>{comment.author}</b> - {comment.body}
                  </Card.Text>
                  {comment.author === user.username ? (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        deleteComment(comment.comment_id);
                        setIsDeleting(false);
                      }}
                    >
                      Delete Comment
                    </Button>
                  ) : null}
                  {isDeleting ? null : <p>Please wait - Deleting Comment!</p>}
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default CommentList;
