import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";
import { useParams } from "react-router-dom";
import { getTopics } from "../utils/api";
import { Card, Button, ButtonGroup, Form, Row, Col } from "react-bootstrap";

function ArticleBlurb() {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState("created_at");
  const [selectedOrder, setSelectedOrder] = useState("desc");
  const [selectedFilter, setSelectedFilter] = useState("");

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topicsArr) => {
        setTopics(topicsArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const params = useParams();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  useEffect(() => {
    getArticles(selectedFilter, selectedSortBy, selectedOrder)
      .then((articleArr) => {
        setArticles(articleArr);
      })
      .catch((err) => {
        console.log(selectedFilter, selectedSortBy, selectedOrder);
        setErr("No articles match this topic!");
      });
  }, [params, selectedSortBy, selectedOrder, selectedFilter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (err) {
    return (
      <section className="Full__article">
        <p>{err}</p>
      </section>
    );
  }
  return (
    <main>
      <div className="form__container">
        <Form className="order__sort__form">
          <Row>
            <Col>
              <Form.Group>
                <label htmlFor="sort__by">Sort By:</label>
                <Form.Select
                  value={selectedSortBy}
                  onChange={(e) => {
                    setSelectedSortBy(e.target.value);
                  }}
                  id="sort__by"
                >
                  <option value="created_at">Date</option>
                  <option value="comment_count">Comment Count</option>
                  <option value="votes">Votes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <label htmlFor="order">Order:</label>

                <Form.Select
                  value={selectedOrder}
                  onChange={(e) => {
                    setSelectedOrder(e.target.value);
                  }}
                  id="order"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <label htmlFor="filter">Filter By Topic:</label>
              <Form.Select
                onChange={(e) => {
                  setSelectedFilter(
                    e.target.value ? `&topic=${e.target.value}` : ""
                  );
                }}
                id="filter"
              >
                <option value="">No Filter</option>
                {topics.map(({ slug }) => {
                  return (
                    <option key={slug} value={slug}>
                      {capitalizeFirstLetter(slug)}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="article__container">
        <ul className="article__list">
          {articles.map((article) => {
            const topicLink = `/${article.topic}`;
            const articleLink = `/article/${article.article_id}`;
            return (
              <li key={article.article_id} className="Article__blurb">
                <Card bg="light" text="dark">
                  <Card.Header>{article.title}</Card.Header>
                  <Card.Text>{article.body}</Card.Text>
                  <Card.Text>
                    <b>Votes</b>: {article.votes} | <b>Author</b>:{" "}
                    {article.author} | <b>Topic</b>: {article.topic} |{" "}
                    <b>CommentCount: </b>
                    {article.comment_count}
                  </Card.Text>
                  <ButtonGroup>
                    <Button variant="secondary" as={Link} to={topicLink}>
                      Related Articles
                    </Button>
                    <Button variant="primary" as={Link} to={articleLink}>
                      Read Full Article
                    </Button>
                  </ButtonGroup>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
      <>
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            &#8679;
          </button>
        )}
      </>
    </main>
  );
}

export default ArticleBlurb;