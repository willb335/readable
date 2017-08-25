import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, removePost, editPost } from "../actions/postActions";
import { isFetchRequestComplete, getCategories } from "../actions/fetchActions";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Root extends Component {
  componentDidMount() {
    this.props.addPost({
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "Udacity is the best place to learn React",
      body: "Everyone says so after all.",
      author: "thingtwo",
      category: "react",
      voteScore: 6,
      deleted: false
    });
    this.getCategoryTypes();
  }

  getCategoryTypes = () => {
    return fetch("http://localhost:5001/categories", {
      headers: { Authorization: "will3" }
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
          <div key={c}>
            <Category name={c} />
          </div>
        );
      }
    };

    return (
      <Grid>
        <Row className="show-category">
          <Col xs={12} md={12}>
            {fetchRequests.isComplete && categoryList()}
          </Col>
        </Row>
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
