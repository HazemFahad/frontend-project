import { useState, useEffect } from "react";
import { postArticle } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";
import { getTopics } from "../utils/api";

function PostArticle() {
  const [articleResponse, setArticleResponse] = useState({});
  const [isPosting, setIsPosting] = useState(true);
  const [topics, setTopics] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("coding");
  const [newArticleBody, setNewArticleBody] = useState("");
  const [err, setErr] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    getTopics()
      .then((topicsArr) => {
        setTopics(topicsArr);
      })
      .catch((err) => {
        setErr("Could not receive Topics - Please try again!");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postArticle(user.username, newTitle, newTopic, newArticleBody)
      .then((newArticle) => {
        setIsPosting(false);
        setNewTitle("");
        setNewTopic("");
        setNewArticleBody("");
        setArticleResponse(newArticle);
      })
      .catch((err) => {
        setErr("Could not submit article - Please try again!");
      });
  };

  if (err) {
    return (
      <section className="Post_article">
        <p>{err}</p>
      </section>
    );
  }

  return (
    <section className="Post_article">
      <form onSubmit={handleSubmit}>
        <textarea
          value={newTitle}
          placeholder="Write Article Title Here!"
          rows="4"
          cols="50"
          required
          onChange={(e) => {
            setNewTitle(e.target.value);
            setIsPosting(true);
          }}
        />
        <select
          value={newTopic}
          required
          onChange={(e) => {
            setNewTopic(e.target.value);
            setIsPosting(true);
          }}
        >
          {topics.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {slug}
              </option>
            );
          })}
        </select>
        <textarea
          value={newArticleBody}
          placeholder="Write Article Title Here!"
          rows="30"
          cols="100"
          required
          onChange={(e) => {
            setNewArticleBody(e.target.value);
            setIsPosting(true);
          }}
        />
        <button type="submit">Post Article</button>
        {isPosting ? null : <p>Comment Posted Successfully!</p>}
      </form>
    </section>
  );
}

export default PostArticle;
