import axios from 'axios';

const apiURL = 'http://localhost:5000/blog';


export async function getAll(config) {
   return await axios.get(`${apiURL}`, config);
  }

  export async function create(blogData, config) {
    return await axios.post(`${apiURL}`, blogData, config);
  }

export async function update(blogId, blogData, config) {
    return await axios.put(`${apiURL}/${blogId}`, blogData, config);
  }
  
  export async function remove(blogId, config) {
    return await axios.delete(`${apiURL}/${blogId}`, config);
  }
  
  export async function postComment(commentData, blogId, config) {
    return await axios.post(`${apiURL}/${blogId}/comments`, commentData, config);
  }
  
  
  
