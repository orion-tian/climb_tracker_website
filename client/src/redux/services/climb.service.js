import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000/climbs/";

const getAllClimbs = () => {
  return axios.get(API_URL, { headers: authHeader() });
}

const getClimbsPerUser = () => {
  return axios.get(API_URL + 'usergroup/', { headers: authHeader() });
}

const getClimb = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
}

const createClimb = (climb) => {
  return axios.post(API_URL + 'add', climb, { headers: authHeader() });
}

const updateClimb = (id, climb) => {
  return axios.patch(API_URL + 'update/' + id, climb, { headers: authHeader() });
}

const deleteClimb = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
}

export default {
  getAllClimbs,
  getClimbsPerUser,
  getClimb,
  createClimb,
  updateClimb,
  deleteClimb
}