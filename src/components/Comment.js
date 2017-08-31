import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import NewCommentModal from "./NewCommentModal";
import EditCommentModal from "./EditCommentModal";
import {
  isModalOpen,
  isCommentModalOpen,
  isEditCommentModalOpen
} from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import {
  isPostSortedByVote,
  isPostSortedByTimestamp,
  isCommentSortedByVote,
  isCommentSortedByTimestamp
} from "../actions/sortActions";
import { isCategoryOpen, setCurrentCategory } from "../actions/categories";
import {
  addComment,
  setCurrentComment,
  editComment
} from "../actions/commentActions";
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
    this.props.isCommentSortedByVote({ isCommentSortedByVote: true });
    this.props.isCommentSortedByTimestamp({
      isCommentSortedByTimestamp: false
    });
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

  onClickSortCommentByTimestamp = () => {
    this.props.isCommentSortedByVote({ isCommentSortedByVote: false });
    this.props.isCommentSortedByTimestamp({ isCommentSortedByTimestamp: true });
  };

  onClickSortCommentByVoteScore = () => {
    this.props.isCommentSortedByVote({ isCommentSortedByVote: true });
    this.props.isCommentSortedByTimestamp({
      isCommentSortedByTimestamp: false
    });
  };

  sortComments = commentsToSort => {
    const { sorts, comments } = this.props;
    switch (true) {
      case sorts.isCommentSortedByVote:
        commentsToSort = comments.sort((b, a) => a.voteScore - b.voteScore);
        break;
      case sorts.isCommentSortedByTimestamp:
        commentsToSort = comments.sort((b, a) => a.timestamp - b.timestamp);
        break;
      default:
        return;
    }
  };

  onClickNewComment = () => {
    this.props.isModalOpen({ isModalOpen: false });
    this.props.isEditCommentModalOpen({ isEditCommentModalOpen: false });
    this.props.isCommentModalOpen({ isCommentModalOpen: true });
    this.props.setCurrentCategory({
      currentCategory: this.props.currentPost.category
    });
  };

  setCurrentComment = currentComment => {
    const payloadComment = { ...currentComment };
    return new Promise(resolve => {
      this.props.setCurrentComment({ currentComment: payloadComment });
      resolve(payloadComment);
    });
  };

  addThumbsUpToComment = payloadComment => {
    return new Promise(resolve => {
      const payload = {
        ...payloadComment,
        voteScore: payloadComment.voteScore + 1
      };
      resolve(payload);
    });
  };

  addNewCommentScoreToStore = payload => {
    return new Promise(resolve => {
      this.props.editComment(payload);
      resolve(payload);
    });
  };

  addCommentVoteScoreChangeToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/comments/${payload.id}`, {
        method: "put",
        headers: {
          Authorization: "will335",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => {
        resolve(payload);
      });
    });
  };

  onClickThumbsUp = comment => {
    Promise.resolve(comment)
      .then(this.setCurrentComment)
      .then(this.addThumbsUpToComment)
      .then(this.addNewCommentScoreToStore)
      .then(this.addCommentVoteScoreChangeToBackEnd);
  };

  addThumbsDownToComment = payloadComment => {
    return new Promise(resolve => {
      const payload = {
        ...payloadComment,
        voteScore: payloadComment.voteScore - 1
      };
      resolve(payload);
    });
  };

  onClickThumbsDown = comment => {
    Promise.resolve(comment)
      .then(this.setCurrentComment)
      .then(this.addThumbsDownToComment)
      .then(this.addNewCommentScoreToStore)
      .then(this.addCommentVoteScoreChangeToBackEnd);
  };

  deleteComment = comment => {
    return new Promise(resolve => {
      const payload = {
        ...comment,
        deleted: true
      };
      resolve(payload);
    });
  };

  addDeletedCommentToStore = payload => {
    return new Promise(resolve => {
      this.props.editComment(payload);
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/comments/${payload.id}`, {
        method: "delete",
        headers: {
          Authorization: "will335",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => {
        resolve(payload);
      });
    });
  };

  onClickDeleteComment = comment => {
    Promise.resolve(comment)
      .then(this.deleteComment)
      .then(this.addDeletedCommentToStore)
      .then(this.postPayloadToBackEnd);
  };

  onClickEditComment = comment => {
    Promise.resolve(comment).then(this.setCurrentComment).then(() => {
      this.props.isEditCommentModalOpen({ isEditCommentModalOpen: true });
      this.props.isCommentModalOpen({ isCommentModalOpen: false });
      this.props.isModalOpen({ isEditCommentModalOpen: false });
    });
  };

  render() {
    const { comments, currentPost } = this.props;
    this.sortComments(comments);

    return (
      <div>
        <EditCommentModal />
        <NewCommentModal />

        <div className="button-comment-container">
          <Button
            bsStyle="primary"
            onClick={this.onClickSortCommentByTimestamp}
          >
            Sort by Date
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.onClickSortCommentByVoteScore}
          >
            Sort by Vote Score
          </Button>
          <Button bsStyle="primary" onClick={this.onClickNewComment}>
            New Comment
          </Button>
        </div>
        <div>
          <ListGroup fill>
            {comments.map(
              c =>
                c.parentId === currentPost.id &&
                !c.deleted &&
                <ListGroupItem key={c.id}>
                  <div>
                    {c.author}
                    <div>
                      <Button
                        bsStyle="primary"
                        onClick={() => this.onClickThumbsUp(c)}
                      >
                        <Glyphicon glyph="thumbs-up" />
                      </Button>

                      <Button
                        bsStyle="primary"
                        onClick={() => this.onClickThumbsDown(c)}
                      >
                        <Glyphicon glyph="thumbs-down" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    {c.body}
                  </div>
                  <div>
                    {c.voteScore}
                  </div>
                  <div>
                    {this.convertDate(c.timestamp)}
                    <div className="comment-buttons">
                      <Button
                        bsSize="xsmall"
                        bsStyle="primary"
                        onClick={() => this.onClickEditComment(c)}
                      >
                        Edit
                      </Button>
                      <Button
                        bsSize="xsmall"
                        bsStyle="primary"
                        onClick={() => this.onClickDeleteComment(c)}
                      >
                        Delete
                      </Button>
                    </div>
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
  comments,
  currentComment
}) {
  return {
    modal,
    posts: Object.values(posts),
    postDetail,
    category,
    currentPost: currentPost.currentPost,
    sorts,
    comments: Object.values(comments),
    currentComment
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
    editComment: data => dispatch(editComment(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data)),
    isEditCommentModalOpen: data => dispatch(isEditCommentModalOpen(data)),
    setCurrentComment: data => dispatch(setCurrentComment(data)),
    isCommentSortedByVote: data => dispatch(isCommentSortedByVote(data)),
    isCommentSortedByTimestamp: data =>
      dispatch(isCommentSortedByTimestamp(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
