import axios from "axios";
const API_URL = "http://localhost:5000/users/";

const signup = (username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password,
  })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  signup,
  login,
  logout,
};