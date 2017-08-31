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
import { addComment } from "../actions/commentActions";
import { setCurrentPost } from "../actions/postActions";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  getCommentsFromServer = () => {
    return new Promise(resolve => {
      fetch(
        `http://localhost:5001/posts/${this.props.currentPost.id}/comments`,
        {
          headers: { Authorization: "will335" }
        }
      ).then(response => {
        resolve(response.json());
        // console.log("response from comment fetch", response.json());
      });
    });
  };

  addCommentsToStore = comments => {
    return new Promise(resolve => {
      comments.forEach(c => {
        this.props.addComment(c);
      });
      resolve();
    });
  };

  componentDidMount() {
    this.props.isPostSortedByVote({ isPostSortedByVote: true });
    this.props.isPostSortedByTimestamp({ isPostSortedByTimestamp: false });
    Promise.resolve("Start")
      .then(this.getCommentsFromServer)
      .then(this.addCommentsToStore);
  }

  render() {
    const {
      modal,
      catName,
      posts,
      isPostSortedByVote,
      isPostSortedByTimestamp,
      comments,
      currentPost
    } = this.props;
    console.log("currentPost is", currentPost);
    console.log("comments are", comments);

    return (
      <div>
        <div className="button-comment-container">
          <Button bsStyle="primary">Sort by Date</Button>
          <Button bsStyle="primary">Sort by Vote Score</Button>
        </div>
        <div>
          <ListGroup fill>
            {comments.map(c =>
              <ListGroupItem key={c.id}>
                {c.body}
              </ListGroupItem>
            )}
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
  sorts,
  comments
}) {
  return {
    modal,
    posts: Object.values(posts),
    postDetail,
    category,
    currentPost: currentPost.currentPost,
    sorts,
    comments: Object.values(comments)
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
    isPostSortedByTimestamp: data => dispatch(isPostSortedByTimestamp(data)),
    addComment: data => dispatch(addComment(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
