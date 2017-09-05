import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";
import PostDetail from "./PostDetail";
import TopNavbar from "./TopNavbar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../actions/postActions";
import { isFetchRequestComplete } from "../actions/fetchActions";
import { getCategories } from "../actions/categories";
import {
  isModalOpen,
  isEditPostModalOpen,
  isCommentModalOpen,
  isEditCommentModalOpen
} from "../actions/modalActions";

class Root extends Component {
  componentDidMount() {
    Promise.resolve("Start")
      .then(this.getCategoryTypes)
      .then(this.setModalState)
      .then(this.getPostsFromServer)
      .then(this.addPostsToStore);
  }

  getCategoryTypes = () => {
    return new Promise(resolve => {
      fetch("http://localhost:5001/categories", {
        headers: { Authorization: "will335" }
      })
        .then(response => response.json())
        .then(data => data.categories.map(c => c.name))
        .then(categories =>
          this.props.getCategories({ categories: categories })
        )
        .then(data => this.props.isFetchRequestComplete({ isComplete: true }));
      resolve("Success");
    });
  };

  setModalState = () => {
    this.props.isModalOpen({ isModalOpen: false });
    this.props.isEditPostModalOpen({ isEditPostModalOpen: false });
    this.props.isCommentModalOpen({ isCommentModalOpen: false });
    this.props.isEditCommentModalOpen({ isEditCommentModalOpen: false });
  };

  getPostsFromServer = () => {
    return new Promise(resolve => {
      fetch("http://localhost:5001/posts", {
        headers: { Authorization: "will335" }
      }).then(response => resolve(response.json()));
    });
  };

  addPostsToStore = posts => {
    return new Promise(resolve => {
      posts.forEach(p => this.props.addPost(p));
      resolve();
    });
  };

  render() {
    const { fetchRequests, category, currentPost } = this.props;
    const categoryList = () => {
      if (category.categories !== undefined) {
        return (
          <div>
            {currentPost && (
              <Route
                path={`/${currentPost.category}/${currentPost.title}`}
                render={() => {
                  return (
                    <div>
                      <PostDetail />
                    </div>
                  );
                }}
              />
            )}
            <Route
              exact={true}
              path={`/${category.currentCategory}`}
              render={() => <Category catName={category.currentCategory} />}
            />

            {category.categories.map(c => (
              <Route
                key={c}
                exact={true}
                path={"/"}
                render={() => {
                  return (
                    <Row className="show-category" key={c}>
                      <Col xs={12} md={12}>
                        <div>
                          <Category catName={c} />
                        </div>
                      </Col>
                    </Row>
                  );
                }}
              />
            ))}
          </div>
        );
      }
    };

    return (
      <div>
        <TopNavbar categories={category.categories} />
        <Grid>{fetchRequests.isComplete && categoryList()}</Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts, fetchRequests, category, currentPost }) {
  return {
    posts,
    fetchRequests,
    category,
    currentPost: currentPost.currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    isFetchRequestComplete: data => dispatch(isFetchRequestComplete(data)),
    getCategories: data => dispatch(getCategories(data)),
    isModalOpen: data => dispatch(isModalOpen(data)),
    isEditPostModalOpen: data => dispatch(isEditPostModalOpen(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data)),
    isEditCommentModalOpen: data => dispatch(isEditCommentModalOpen(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
