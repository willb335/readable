import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import NewPostModal from "./NewPostModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import {
  isPostSortedByVote,
  isPostSortedByTimestamp
} from "../actions/sortActions";
import { setCurrentCategory } from "../actions/categories";
import { setCurrentPost } from "../actions/postActions";

class Category extends Component {
  componentDidMount() {
    this.props.isPostSortedByVote({ isPostSortedByVote: true });
    this.props.isPostSortedByTimestamp({ isPostSortedByTimestamp: false });
  }

  onClickNewPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  clickPost = p => {
    this.props.setCurrentPost({ currentPost: p });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
    this.props.isPostDetailOpen({ isPostDetailOpen: true });
  };

  clickCategory = () => {
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  onClickSortPostByTimestamp = () => {
    this.props.isPostSortedByVote({ isPostSortedByVote: false });
    this.props.isPostSortedByTimestamp({ isPostSortedByTimestamp: true });
  };

  onClickSortPostByVoteScore = () => {
    this.props.isPostSortedByVote({ isPostSortedByVote: true });
    this.props.isPostSortedByTimestamp({ isPostSortedByTimestamp: false });
  };

  sortPosts = postsToSort => {
    const { sorts, posts } = this.props;
    switch (true) {
      case sorts.isPostSortedByVote:
        postsToSort = posts.sort((b, a) => a.voteScore - b.voteScore);
        break;
      case sorts.isPostSortedByTimestamp:
        postsToSort = posts.sort((b, a) => a.timestamp - b.timestamp);
        break;
      default:
        return;
    }
  };

  convertDate = inputFormat => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  render() {
    const { catName, posts } = this.props;
    this.sortPosts(posts);
    const filteredPosts = posts.filter(p => !p.deleted);
    return (
      <div>
        <NewPostModal />
        <Panel
          header={
            <div className="category-container">
              <Link
                to={`/${catName}`}
                onClick={this.clickCategory}
                style={{ cursor: "pointer", color: "#337ab7" }}
              >
                {catName}
              </Link>

              <div>
                <Button
                  bsStyle="primary"
                  onClick={this.onClickSortPostByTimestamp}
                >
                  Sort By Date
                </Button>
              </div>
              <div>
                <Button
                  bsStyle="primary"
                  onClick={this.onClickSortPostByVoteScore}
                >
                  Sort by Vote
                </Button>
              </div>
              <div>
                <Link to={`/newpost`} onClick={this.onClickNewPost}>
                  <Button bsStyle="primary">New Post</Button>
                </Link>
              </div>
            </div>
          }
          style={{ textAlign: "left" }}
        >
          <ListGroup fill>
            <div className="posts-container">
              {posts.map(
                (p, i) =>
                  p.category === catName &&
                  !p.deleted &&
                  <ListGroupItem key={i}>
                    <Link
                      to={`/${p.category}/${p.title}`}
                      onClick={() => this.clickPost(p)}
                      style={{ cursor: "pointer" }}
                    >
                      {p.title}
                    </Link>

                    <div>{`Vote Score is ${p.voteScore}`}</div>
                    <div>{`Date ${this.convertDate(p.timestamp)}`}</div>
                  </ListGroupItem>
              )}
            </div>
          </ListGroup>
        </Panel>
      </div>
    );
  }
}
function mapStateToProps({
  modal,
  posts,
  postDetail,
  category,
  currentPost,
  sorts
}) {
  return {
    modal,
    posts: Object.values(posts),
    postDetail,
    category,
    currentPost,
    sorts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    isPostSortedByVote: data => dispatch(isPostSortedByVote(data)),
    isPostSortedByTimestamp: data => dispatch(isPostSortedByTimestamp(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
