import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";

function PostComment() {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [isPosting, setIsPosting] = useState(true);

  const { user } = useContext(UserContext);
  const { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewCommentBody("");
    postComment(article_id, user.username, newCommentBody).then(() => {
      setIsPosting(false);
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCommentBody}
          placeholder="Write Comment Here!"
          onChange={(e) => {
            setNewCommentBody(e.target.value);
            setIsPosting(true);
          }}
        />

        <button type="submit">Post Comment</button>
        {isPosting ? null : <p>Comment Posted Successfully!</p>}
      </form>
    </div>
  );
}

export default PostComment;
