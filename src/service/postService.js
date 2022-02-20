/* import axios from "axios";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

function getPosts() {
  const { data } = await axios.get(apiUrl);
  return data;
}

function createPost() {
  const { data } = await axios.post(apiUrl, post);
}
 */

import http from "./httpService";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export function getPosts() {
  return http.get(apiUrl);
}
export function createPosts(post) {
  return http.post(apiUrl, post);
}

export function updatePost(id, post) {
  return http.put(`${apiUrl}/${id}`, post);
}
export function deletePost(id) {
  return http.delete(`${apiUrl}/${id}`);
}
