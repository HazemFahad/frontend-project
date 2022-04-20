import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://jibinandshwey.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    console.log(data.users);
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

export const getTopics = () => {
  return newsApi.get(`/topics`).then(({ data }) => {
    console.log(data.topics);
    return data.topics;
  });
};
