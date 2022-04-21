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
  return newsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const getArticles = () => {
  return newsApi.get(`/articles`).then(({ data }) => {
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
  return newsApi.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
