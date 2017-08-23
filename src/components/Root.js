import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, removePost, editPost } from "../actions";
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
  }
  render() {
    const { post, addPost, removePost, editPost } = this.props;

    console.log("post prop", post);

    return (
      <Grid>
        <Row className="show-category">
          <Col xs={12} md={12}>
            <Category />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    removePost: data => dispatch(removePost(data)),
    editPost: data => dispatch(editPost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
