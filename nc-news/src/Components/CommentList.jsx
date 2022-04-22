import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, deleteCommentByID } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";

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
  }, [article_id, comments]);

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
    <section className="Comment__list">
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <p>{comment.body}</p>
              {comment.author === user.username ? (
                <button
                  onClick={() => {
                    deleteComment(comment.comment_id);
                    setIsDeleting(false);
                  }}
                >
                  Delete Comment
                </button>
              ) : null}
              {isDeleting ? null : <p>Please wait - Deleting Comment!</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentList;
