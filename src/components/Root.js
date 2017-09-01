import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";
import PostDetail from "./PostDetail";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addPost } from "../actions/postActions";
import { isFetchRequestComplete } from "../actions/fetchActions";
import { getCategories } from "../actions/categories";

class Root extends Component {
  getPostsFromServer = () => {
    return new Promise(resolve => {
      fetch("http://localhost:5001/posts", {
        headers: { Authorization: "will335" }
      }).then(response => {
        resolve(response.json());
      });
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
      .then(response => response.json())
      .then(data => {
        this.props.isFetchRequestComplete({ isComplete: true });
        const categories = data.categories.map(c => c.name);
        return categories;
      })
      .then(categories => this.props.getCategories({ categories: categories }));
  };

  render() {
    const { fetchRequests, category, match, currentPost } = this.props;
    const categoryList = () => {
      if (category.categories !== undefined) {
        return (
          <div>
            {currentPost &&
              <Route
                path={`/${currentPost.category}/${currentPost.title}`}
                render={() => {
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
            <Route
              path={`/newpost`}
              render={() =>
                <div>
                  <Category catName={category.currentCategory} />
                </div>}
            />
            {category.categories.map(c =>
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
    isFetchRequestComplete: data => dispatch(isFetchRequestComplete(data)),
    getCategories: data => dispatch(getCategories(data))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
