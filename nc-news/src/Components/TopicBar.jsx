import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

function TopicBar() {
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

  return (
    <section>
      <h3>Filter By:</h3>
      <div className="Topic__bar">
        <nav>
          {topics.map(({ slug, description }) => {
            return (
              <Link to={`/${slug}`} key={`${slug}`} className="Topic__link">
                {slug} - {description}
              </Link>
            );
          })}
          <Link to="/" key="home" className="Topic__link">
            Remove Filter
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default TopicBar;
