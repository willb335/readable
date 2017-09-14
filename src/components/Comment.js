import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button, Glyphicon } from "react-bootstrap";
import NewCommentModal from "./NewCommentModal";
import EditCommentModal from "./EditCommentModal";
import { connect } from "react-redux";
import {
  isModalOpen,
  isCommentModalOpen,
  isEditCommentModalOpen
} from "../actions/modalActions";
import {
  isCommentSortedByVote,
  isCommentSortedByTimestamp
} from "../actions/sortActions";
import { setCurrentCategory } from "../actions/categories";
import {
  addComment,
  setCurrentComment,
  editComment
} from "../actions/commentActions";
import { editBody, editAuthor } from "../actions/editFormAction";

class Comment extends Component {
  componentDidMount() {
    Promise.resolve("Start")
      .then(this.sortByVote)
      .then(this.getCommentsFromServer)
      .then(this.addCommentsToStore);
  }

  sortByVote = () => {
    return new Promise(resolve => {
      this.props.isCommentSortedByVote({ isCommentSortedByVote: true });
      this.props.isCommentSortedByTimestamp({
        isCommentSortedByTimestamp: false
      });
      resolve("Success");
    });
  };

  getCommentsFromServer = () => {
    return new Promise(resolve => {
      fetch(
        `https://ul3cjjg9oi.execute-api.us-west-2.amazonaws.com/dev/comments`
      ).then(response => resolve(response.json()));
    });
  };

  addCommentsToStore = comments => {
    return new Promise(resolve => {
      comments.forEach(c => this.props.addComment(c));
      resolve("Success");
    });
  };

  onClickSortCommentByVoteScore = () => {
    this.props.isCommentSortedByVote({ isCommentSortedByVote: true });
    this.props.isCommentSortedByTimestamp({
      isCommentSortedByTimestamp: false
    });
  };

  onClickSortCommentByTimestamp = () => {
    this.props.isCommentSortedByVote({ isCommentSortedByVote: false });
    this.props.isCommentSortedByTimestamp({ isCommentSortedByTimestamp: true });
  };

  onClickNewComment = () => {
    this.props.isModalOpen({ isModalOpen: false });
    this.props.isEditCommentModalOpen({ isEditCommentModalOpen: false });
    this.props.isCommentModalOpen({ isCommentModalOpen: true });
    this.props.setCurrentCategory({
      currentCategory: this.props.currentPost.category
    });
  };

  onClickThumbsUp = comment => {
    Promise.resolve(comment)
      .then(this.setCurrentComment)
      .then(this.addThumbsUpToComment)
      .then(this.addNewCommentScoreToStore)
      .then(this.addCommentVoteScoreChangeToBackEnd);
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
      fetch(
        `https://ul3cjjg9oi.execute-api.us-west-2.amazonaws.com/dev/comments/${payload.id}`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      ).then(response => resolve(payload));
    });
  };

  onClickThumbsDown = comment => {
    Promise.resolve(comment)
      .then(this.setCurrentComment)
      .then(this.addThumbsDownToComment)
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

  onClickDeleteComment = comment => {
    Promise.resolve(comment)
      .then(this.deleteComment)
      .then(this.addDeletedCommentToStore)
      .then(this.postPayloadToBackEnd);
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
      fetch(
        `https://ul3cjjg9oi.execute-api.us-west-2.amazonaws.com/dev/comments/${payload.id}`,
        {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      ).then(response => resolve(payload));
    });
  };

  onClickEditComment = comment => {
    Promise.resolve(comment)
      .then(this.setCurrentComment)
      .then(this.populateEditComment)
      .then(this.openEditCommentModal);
  };

  populateEditComment = comment => {
    return new Promise(resolve => {
      this.props.editAuthor({ author: comment.author });
      this.props.editBody({ body: comment.body });
      resolve("Success");
    });
  };

  openEditCommentModal = () => {
    return new Promise(resolve => {
      this.props.isEditCommentModalOpen({ isEditCommentModalOpen: true });
      this.props.isCommentModalOpen({ isCommentModalOpen: false });
      this.props.isModalOpen({ isEditCommentModalOpen: false });
      resolve("Success");
    });
  };

  convertDate = inputFormat => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    const d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
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

  render() {
    const { comments, currentPost } = this.props;
    this.sortComments(comments);

    return (
      <div className="main-comment">
        <EditCommentModal />
        <NewCommentModal />

        <div className="button-comment-container">
          <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={this.onClickSortCommentByTimestamp}
          >
            Sort by Date
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={this.onClickSortCommentByVoteScore}
          >
            Sort by Vote Score
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="primary"
            onClick={this.onClickNewComment}
          >
            New Comment
          </Button>
        </div>
        <div>
          <ListGroup fill>
            {comments.map(
              c =>
                c.parentId === currentPost.id &&
                !c.deleted && (
                  <ListGroupItem key={c.id}>
                    <div className="single-comment">
                      <div className="comment-votes">
                        <Button
                          bsSize="xsmall"
                          bsStyle="primary"
                          onClick={() => this.onClickThumbsUp(c)}
                        >
                          <Glyphicon glyph="thumbs-up" />
                        </Button>

                        <Button
                          bsSize="xsmall"
                          bsStyle="primary"
                          onClick={() => this.onClickThumbsDown(c)}
                        >
                          <Glyphicon glyph="thumbs-down" />
                        </Button>
                      </div>
                      <div>{c.author}</div>
                      <div>{c.body}</div>
                      <div>{c.voteScore}</div>
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
                    </div>
                  </ListGroupItem>
                )
            )}
          </ListGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentPost, sorts, comments }) {
  return {
    currentPost: currentPost.currentPost,
    sorts,
    comments: Object.values(comments)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editBody: data => dispatch(editBody(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data)),
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
