import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById } from "../utils/api";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState("");

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

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
