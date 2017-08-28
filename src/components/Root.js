import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, removePost, editPost } from "../actions/postActions";
import { isFetchRequestComplete, getCategories } from "../actions/fetchActions";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Root extends Component {
  getPostsFromServer = () => {
    return new Promise(resolve => {
      fetch("http://localhost:5001/posts", {
        headers: { Authorization: "will335" }
      })
        .then(response => {
          resolve(response.json());
        })
        .then(posts => resolve(posts));
    });
  };

  addPostsToStore = posts => {
    return new Promise(resolve => {
      posts.forEach(p => {
        this.props.addPost(p);
      });
      resolve();
    });
  };

  componentDidMount() {
    this.getCategoryTypes();
    Promise.resolve("Start")
      .then(this.getPostsFromServer)
      .then(this.addPostsToStore);
  }

  getCategoryTypes = () => {
    return fetch("http://localhost:5001/categories", {
      headers: { Authorization: "will335" }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.isFetchRequestComplete({ isComplete: true });
        return data.categories.map(c => c.name);
      })
      .then(data => {
        this.props.getCategories({ categories: data });
      });
  };

  render() {
    const { fetchRequests } = this.props;
    const categoryList = () => {
      if (fetchRequests.categories !== undefined) {
        return fetchRequests.categories.map(c =>
          <Row className="show-category" key={c}>
            <Col xs={12} md={12}>
              <Category catName={c} />
            </Col>
          </Row>
        );
      }
    };

    return (
      <Grid>
        {fetchRequests.isComplete && categoryList()}
      </Grid>
    );
  }
}

function mapStateToProps({ posts, fetchRequests }) {
  return {
    posts,
    fetchRequests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    removePost: data => dispatch(removePost(data)),
    editPost: data => dispatch(editPost(data)),
    isFetchRequestComplete: data => dispatch(isFetchRequestComplete(data)),
    getCategories: data => dispatch(getCategories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
