import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { addPost, removePost, editPost } from "../actions/postActions";
import { isFetchRequestComplete, getCategories } from "../actions/fetchActions";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";
import PostDetail from "./PostDetail";
import { isCategoryOpen } from "../actions/categories";
import { isModalOpen } from "../actions/modalActions";
import { isBackButtonClicked } from "../actions/backButtonAction";
import { withRouter } from "react-router-dom";

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
    // this.props.isModalOpen({ isModalOpen: false });
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
      .then(cats => {
        this.props.getCategories({ categories: cats });
      });
  };

  render() {
    const { fetchRequests, category, match, currentPost } = this.props;
    const categoryList = () => {
      if (fetchRequests.categories !== undefined) {
        return (
          <div>
            {currentPost &&
              <Route
                path={`/${currentPost.category}/${currentPost.title}`}
                render={({ match }) => {
                  return (
                    <div>
                      <PostDetail />
                    </div>
                  );
                }}
              />}
            <Route
              exact={true}
              path={`/${category.currentCategory}`}
              render={() => <Category catName={category.currentCategory} />}
            />
            {fetchRequests.categories.map(c =>
              <Route
                key={c}
                exact={true}
                path={match.url}
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
            )}
          </div>
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

function mapStateToProps({
  posts,
  fetchRequests,
  postDetail,
  category,
  backButton,
  currentPost
}) {
  return {
    posts,
    fetchRequests,
    postDetail,
    category,
    backButton,
    currentPost: currentPost.currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    removePost: data => dispatch(removePost(data)),
    editPost: data => dispatch(editPost(data)),
    isFetchRequestComplete: data => dispatch(isFetchRequestComplete(data)),
    getCategories: data => dispatch(getCategories(data)),
    isCategoryOpen: data => dispatch(isCategoryOpen(data)),
    isBackButtonClicked: data => dispatch(isBackButtonClicked(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
