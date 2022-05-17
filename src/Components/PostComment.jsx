import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";

function PostComment() {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(true);
  const [err, setErr] = useState("");

  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <section className="Post_comment">
        <p>{err}</p>
      </section>
    );
  }
  return (
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

          <Button type="submit">Post Comment</Button>
          {isPosting ? null : <p>Comment Posted Successfully!</p>}
        </Form.Group>
      </Form>
    </section>
  );
}

export default PostComment;
