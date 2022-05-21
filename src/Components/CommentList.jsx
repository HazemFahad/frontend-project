import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, deleteCommentByID } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { Card, Button, Form } from "react-bootstrap";
import { postComment } from "../utils/api";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState("");
  const [isDeleting, setIsDeleting] = useState(true);
  const { user } = useContext(UserContext);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [newComment, setNewComment] = useState("");

  const [isPosting, setIsPosting] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getCommentsById(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi.reverse());
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewComment(newCommentBody);

    postComment(article_id, user.username, newCommentBody)
      .then(() => {
        setIsPosting(false);
        setNewCommentBody("");
      })
      .catch((err) => {
        setErr("Could not submit comment - Please try again!");
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
      <section className="Post_comment">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              value={newCommentBody}
              placeholder="Write Comment Here!"
              rows="4"
              cols="50"
              required
              onChange={(e) => {
                setNewCommentBody(e.target.value);
                setIsPosting(true);
              }}
            />

            <Button className="post__button" type="submit">
              Post Comment
            </Button>
            {isPosting ? null : <p>Comment Posted Successfully!</p>}
          </Form.Group>
        </Form>
      </section>
      <section className="Comment__list">
        <ul>
          {newComment ? (
            <li className="Comment__item">
              <Card bg="light" text="dark">
                <Card.Text>
                  <b>{user.username}</b> - {newComment}
                </Card.Text>
              </Card>
            </li>
          ) : (
            <></>
          )}
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
