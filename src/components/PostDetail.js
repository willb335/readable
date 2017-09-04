import React, { Component } from "react";
import { Well, Panel, Button, Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import Comment from "./Comment";
import EditPostModal from "./EditPostModal";
import { withRouter } from "react-router-dom";
import { isEditPostModalOpen } from "../actions/modalActions";
import { editPost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import { editComment } from "../actions/commentActions";

class PostDetail extends Component {
  onClickEditPost = () => {
    Promise.resolve(this.props.currentPost)
      .then(this.populatePostForm)
      .then(() =>
        this.props.isEditPostModalOpen({ isEditPostModalOpen: true })
      );
  };

  populatePostForm = currentPost => {
    return new Promise(resolve => {
      this.props.editAuthor({ author: currentPost.author });
      this.props.editBody({ body: currentPost.body });
      this.props.editTitle({ title: currentPost.title });
      resolve("Success");
    });
  };

  onClickDeletePost = () => {
    Promise.resolve(this.props.currentPost)
      .then(this.deletePost)
      .then(this.addDeletedPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.deleteComments)
      .then(() => this.props.history.push(`/`));
  };

  deletePost = currentPost => {
    return new Promise(resolve => {
      const payload = {
        ...currentPost,
        deleted: true
      };
      resolve(payload);
    });
  };

  addDeletedPostToStore = payload => {
    return new Promise(resolve => {
      this.props.editPost(payload);
      this.props.setCurrentPost({ currentPost: payload });
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/posts/${payload.id}`, {
        method: "delete",
        headers: {
          Authorization: "will335",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => resolve(payload));
    });
  };

  deleteComments = () => {
    return new Promise(resolve => {
      const comments = { ...this.props.comments };
      const keys = Object.keys(comments);
      const filtered_keys = keys.filter(
        key => comments[key].parentId === this.props.currentPost.id
      );
      if (filtered_keys.length !== 0) {
        Promise.resolve("Start")
          .then(this.deleteFilteredComments)
          .then(this.addDeletedCommentsToStore)
          .then(this.postCommentPayloadArrayToBackend);
      }
      resolve("Success");
    });
  };

  deleteFilteredComments = () => {
    return new Promise(resolve => {
      const comments = { ...this.props.comments };
      let filteredComments = [];
      const keys = Object.keys(comments);
      const filtered_keys = keys.filter(
        key => comments[key].parentId === this.props.currentPost.id
      );
      filtered_keys.forEach(key => {
        let payload = {};
        if (this.props.currentPost.deleted)
          payload = {
            ...comments[key],
            deleted: true
          };
        filteredComments.push(payload);
      });
      resolve(filteredComments);
    });
  };

  addDeletedCommentsToStore = commentArray => {
    return new Promise(resolve => {
      commentArray.forEach(c => this.props.editComment(c));
      resolve(commentArray);
    });
  };

  postCommentPayloadArrayToBackend = commentArray => {
    return new Promise(resolve => {
      commentArray.forEach(c => {
        fetch(`http://localhost:5001/comments/${c.id}`, {
          method: "delete",
          headers: {
            Authorization: "will335",
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(c)
        }).then(response => resolve("Success"));
      });
    });
  };

  onClickThumbsUp = () => {
    Promise.resolve(this.props.currentPost)
      .then(this.addThumbsUpToPost)
      .then(this.addNewScoreToStore)
      .then(this.addNewScoreToBackEnd);
  };

  addThumbsUpToPost = currentPost => {
    return new Promise(resolve => {
      const payload = {
        ...currentPost,
        voteScore: currentPost.voteScore + 1
      };
      resolve(payload);
    });
  };

  addNewScoreToStore = payload => {
    return new Promise(resolve => {
      this.props.editPost(payload);
      this.props.setCurrentPost({ currentPost: payload });
      resolve(payload);
    });
  };

  addNewScoreToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/posts/${payload.id}`, {
        method: "put",
        headers: {
          Authorization: "will335",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(() => resolve("Success"));
    });
  };

  onClickThumbsDown = () => {
    Promise.resolve(this.props.currentPost)
      .then(this.addThumbsDownToPost)
      .then(this.addNewScoreToStore)
      .then(this.addScoreChangeToBackEnd);
  };

  addThumbsDownToPost = currentPost => {
    return new Promise(resolve => {
      const payload = {
        ...currentPost,
        voteScore: currentPost.voteScore - 1
      };
      resolve(payload);
    });
  };

  convertDate = inputFormat => {
    const pad = s => (s < 10 ? "0" + s : s);
    const d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  render() {
    const { currentPost, comments } = this.props;
    let commentKeys = Object.keys(comments);
    let filteredKeys = commentKeys.filter(
      key =>
        comments[key].parentId === this.props.currentPost.id &&
        !comments[key].deleted
    );

    return (
      <div className="well-post">
        <EditPostModal />
        <Well style={{ marginTop: "2%" }}>
          <div className="user-post">
            <div className="post-vote-score">
              <div>
                <Panel
                  header={
                    <div>
                      <Button bsStyle="primary" onClick={this.onClickThumbsUp}>
                        <Glyphicon glyph="thumbs-up" />
                      </Button>

                      <Button
                        bsStyle="primary"
                        onClick={this.onClickThumbsDown}
                      >
                        <Glyphicon glyph="thumbs-down" />
                      </Button>
                    </div>
                  }
                />
              </div>

              <div
                className="post-vote-count"
                style={{ fontSize: "1.25em", color: "#337ab7" }}
              >{`Votes: ${currentPost.voteScore}`}</div>
            </div>
            <div style={{ height: "1em" }} />

            <div>
              <strong>
                {currentPost.title}
              </strong>
            </div>
            <div>
              <strong>
                {currentPost.author}
              </strong>
            </div>
            <div>
              <strong>
                {this.convertDate(currentPost.timestamp)}
              </strong>
            </div>
            <div>
              <strong>
                {`Current number of comments ${filteredKeys.length}`}
              </strong>
            </div>

            <hr style={{ borderWidth: "2px" }} />
            {currentPost.body}
            <hr style={{ borderWidth: "2px" }} />
            <Panel
              header={
                <div className="comment-container">
                  <div>
                    <Button bsStyle="primary" onClick={this.onClickDeletePost}>
                      Delete Post
                    </Button>
                  </div>
                  <div className="edit-comment">
                    <Button bsStyle="primary" onClick={this.onClickEditPost}>
                      Edit Post
                    </Button>
                  </div>
                </div>
              }
              style={{ textAlign: "left" }}
            />
          </div>
        </Well>
        <Comment />
      </div>
    );
  }
}

function mapStateToProps({ currentPost, comments }) {
  return {
    currentPost: currentPost.currentPost,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isEditPostModalOpen: data => dispatch(isEditPostModalOpen(data)),
    editPost: data => dispatch(editPost(data)),
    editComment: data => dispatch(editComment(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
