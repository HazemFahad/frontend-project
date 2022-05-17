import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://jibinandshwey.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/fullusers/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const getFullUserData = () => {
  return newsApi.get("/users/fullusers").then(({ data }) => {
    return data.users;
  });
};

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get(`/articles?sort_by=${sort_by}&order=${order}${topic}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getTopics = () => {
  return newsApi.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const patchArticle = (article_id, updateCount) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: updateCount })
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsById = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const postComment = (article_id, username, body) => {
  return newsApi

    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: body,
    })
    .then(({ data }) => {
      return data;
    });
};

export const deleteCommentByID = (id) => {
  return newsApi.delete(`/comments/${id}`).then((response) => {
    console.log(response);
  });
};

export const deleteArticleByID = (id) => {
  return newsApi.delete(`/comments/${id}`).then((response) => {
    console.log(response);
  });
};

export const postArticle = (author, title, topic, body) => {
  return newsApi

    .post(`/articles`, {
      author: author,
      title: title,
      topic: topic,
      body: body,
    })
    .then(({ data }) => {
      console.log(data.article);
      return data.article;
    });
};
