import { useState, useEffect } from "react";
import { postArticle } from "../utils/api";
import { UserContext } from "../Contexts/User";
import { useContext } from "react";
import { getTopics } from "../utils/api";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function PostArticle() {
  const [isPosting, setIsPosting] = useState(true);
  const [topics, setTopics] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("coding");
  const [newArticle, setNewArticle] = useState({});
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
        setNewArticle(newArticle);
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
    <div className="form__container">
      <Form className="post__article" onSubmit={handleSubmit}>
        <h1>Post An Article</h1>
        <Form.Group>
          <Form.Label className="post__label">Article Title</Form.Label>
          <Form.Control
            as="textarea"
            value={newTitle}
            placeholder="Write Article Title Here!"
            rows="4"
            required
            onChange={(e) => {
              setNewTitle(e.target.value);
              setIsPosting(true);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="post__label">Select a Topic</Form.Label>

          <Form.Select
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
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="post__label">
            Write Your Article Below
          </Form.Label>

          <Form.Control
            as="textarea"
            value={newArticleBody}
            placeholder="Write Article Title Here!"
            rows="15"
            required
            onChange={(e) => {
              setNewArticleBody(e.target.value);
              setIsPosting(true);
            }}
          />
        </Form.Group>
        <Button className="post__button" type="submit">
          Post Article
        </Button>
        {isPosting ? null : (
          <Button
            className="post__button"
            as={Link}
            to={`/article/${newArticle.article_id}`}
          >
            Check Out Your New Article!
          </Button>
        )}
      </Form>
    </div>
  );
}

export default PostArticle;
