import React, { Component } from "react";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
} from "../service/postService";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    this.setState({ posts });
  }
  handleCreate = async () => {
    const post = { title: "Ponsit", body: "I love pondit" };
    const { data } = await createPosts(post);
    const posts = [data, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async (postId) => {
    const post = { title: "updated the title" };
    const { data } = await updatePost(postId, post);
    const posts = [...this.state.posts];
    posts.forEach((post) => {
      if (post.id == postId) {
        post.title = data.title;
      }
    });
    this.setState({ posts });
  };
  handleDelete = async (postId) => {
    await deletePost(postId);
    const posts = [...this.state.posts];
    const updatedPosts = posts.filter((post) => post.id !== postId);
    this.setState({ posts: updatedPosts });
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
