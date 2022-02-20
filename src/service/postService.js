import axios from "axios";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

function getPosts() {
  const { data } = await axios.get(apiUrl);
  return data;
}

function createPost() {
  const { data } = await axios.post(apiUrl, post);
}
