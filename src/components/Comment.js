import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import { isModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import {
  isPostSortedByVote,
  isPostSortedByTimestamp
} from "../actions/sortActions";
import { isCategoryOpen, setCurrentCategory } from "../actions/categories";
import { setCurrentPost } from "../actions/postActions";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  componentDidMount() {
    this.props.isPostSortedByVote({ isPostSortedByVote: true });
    this.props.isPostSortedByTimestamp({ isPostSortedByTimestamp: false });
  }

  render() {
    const {
      modal,
      catName,
      posts,
      isPostSortedByVote,
      isPostSortedByTimestamp
    } = this.props;

    return (
      <div>
        <div className="button-comment-container">
          <Button bsStyle="primary">Sort by Date</Button>
          <Button bsStyle="primary">Sort by Vote Score</Button>
        </div>
        <div>
          <ListGroup fill>
            <ListGroupItem>
              Comments will be in here Comments will be in here Comments will be
              in here Comments will be in here Comments will be in here
            </ListGroupItem>
            <ListGroupItem>
              Comments will be in here Comments will be in here Comments will be
              in here Comments will be in here Comments will be in here
            </ListGroupItem>
          </ListGroup>
        </div>
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
    isCategoryOpen: data => dispatch(isCategoryOpen(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    isPostSortedByVote: data => dispatch(isPostSortedByVote(data)),
    isPostSortedByTimestamp: data => dispatch(isPostSortedByTimestamp(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
