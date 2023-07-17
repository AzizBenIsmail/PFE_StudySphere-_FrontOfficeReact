import axios from "axios";

const apiURL = "http://localhost:5000/company";

export async function getCompagne(config) {
  return await axios.get(`${ apiURL }/`, config);
}