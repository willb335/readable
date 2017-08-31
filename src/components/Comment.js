import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import NewCommentModal from "./NewCommentModal";
import { isModalOpen, isCommentModalOpen } from "../actions/modalActions";
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

  convertDate = inputFormat => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  onClickNewComment = () => {
    // this.props.isPostDetailOpen({ isPostDetailOpen: false });
    this.props.isModalOpen({ isModalOpen: false });
    this.props.isCommentModalOpen({ isCommentModalOpen: true });
    this.props.setCurrentCategory({
      currentCategory: this.props.currentPost.category
    });
  };

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
          <Button bsStyle="primary" onClick={this.onClickNewComment}>
            New Post
          </Button>
          <NewCommentModal />
        </div>
        <div>
          <ListGroup fill>
            {comments.map(c =>
              <ListGroupItem key={c.id}>
                <div>
                  {c.author}
                </div>

                <div>
                  {c.body}
                </div>
                <div>
                  {c.voteScore}
                </div>
                <div>
                  {this.convertDate(c.timestamp)}
                </div>
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
    addComment: data => dispatch(addComment(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
