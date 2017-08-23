import React, { Component } from "react";
import { addPost, removePost, editPost } from "../actions";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Root extends Component {
  render() {
    const { post, addPost, removePost, editPost } = this.props;
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
