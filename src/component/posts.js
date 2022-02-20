import axios from "axios";
import React, { Component } from "react";
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

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
      const post = { id: postId, title: "updated the title" };
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
                      <button className="btn btn-danger">Delete</button>
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
