import axios from "axios";
import { Toast } from "bootstrap";
import React, { Component } from "react";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logged the error", error);
    alert("An unexpected error occured. Please try again later. ");
  } else if (error.response.status === 400) {
    alert("Bad request");
  } else if (error.response.status === 404) {
    alert("This post is not found or previously deleted");
  }
  // console.log(error.response);
  return Promise.reject(error);
});

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // const promise = axios.get("https://jsonplaceholder.typicode.com/posts");
    try {
      const { data: posts } = await axios.get(apiUrl);
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
    /* Request
      1.get => server theke data niye ase
      2.post => server e kono kichu create kore, ex: user,post,cmnt create kore
      3.put => user,post cmnt update kora jebe,total update e put r partial update e patch
      4.patch => total update e put r partial update e patch
      5.delete => useer,post,cmnt,group,page esob delete kora jabe
       */
  }
  handleCreate = async () => {
    try {
      const post = { title: "Ponsit", body: "I love pondit" };
      const { data } = await axios.post(apiUrl, post);
      const posts = [data, ...this.state.posts];
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  };
  handleUpdate = async (postId) => {
    try {
      const post = { title: "updated the title" };
      const { data } = await axios.put(`${apiUrl}/${postId}`, post);
      const posts = [...this.state.posts];
      posts.forEach((post) => {
        if (post.id == postId) {
          post.title = data.title;
        }
      });
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  };
  handleDelete = async (postId) => {
    try {
      await axios.delete(`dfdfdf${apiUrl}/${postId}/ur`);
      const posts = [...this.state.posts];
      const updatedPosts = posts.filter((post) => post.id !== postId);
      this.setState({ posts: updatedPosts });
    } catch (error) {
      /* 
        Error 2 types er
        1.expected errors or client errors (400 – bad request,404 – not found)
        2. Unexpected errors (network off,server down, server bug, )
      */
    }
  };
  render() {
    return (
      <>
        <div className="container text-center">
          <button className="btn btn-primary" onClick={this.handleCreate}>
            Add
          </button>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => {
                return (
                  <tr key={post.id}>
                    <th scope="row">{post.id}</th>
                    <td>{post.title}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleUpdate(post.id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Posts;
