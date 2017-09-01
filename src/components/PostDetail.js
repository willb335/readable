import React, { Component } from "react";
import { connect } from "react-redux";
import { Well, Panel, Button, Glyphicon } from "react-bootstrap";
import { isModalOpen } from "../actions/modalActions";
import Comment from "./Comment";
import EditModal from "./EditModal";
import { editPost, removePost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import { withRouter } from "react-router-dom";

class PostDetail extends Component {
  currentPost = { ...this.props.currentPost };

  onClickEditPost = () => {
    Promise.resolve(this.currentPost)
      .then(currentPost => {
        this.props.editAuthor({ author: currentPost.author });
        this.props.editBody({ body: currentPost.body });
        this.props.editTitle({ title: currentPost.title });
      })
      .then(() => this.props.isModalOpen({ isModalOpen: true }));
  };

  deletePost = cP => {
    return new Promise(resolve => {
      const payload = {
        ...cP,
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
      }).then(response => {
        resolve(payload);
      });
    });
  };

  deleteFilteredComments = () => {
    return new Promise(resolve => {
      let comments = { ...this.props.comments };
      let filteredComments = [];
      let keys = Object.keys(comments);
      let filtered_keys = keys.filter(
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
        console.log("fitleredCommenta", filteredComments);
      });
      resolve(filteredComments);
    });
  };

  addDeletedCommentsToBackend = commentArray => {
    return new Promise(resolve => {
      commentArray.forEach(c => {
        this.props.editComment(c);
      });
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
        }).then(response => {
          console.log("commentArray array on exit", commentArray);
          resolve(commentArray);
        });
      });
    });
  };

  onClickDeletePost = () => {
    Promise.resolve(this.currentPost)
      .then(this.deletePost)
      .then(this.addDeletedPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.filteredComments)
      .then(this.deleteFilteredComments)
      .then(this.addDeletedCommentsToBackend)
      .then(this.postCommentPayloadArrayToBackend)
      .then(() => this.props.history.push(`/`));
  };

  addThumbsUpToPost = cP => {
    return new Promise(resolve => {
      const payload = {
        ...cP,
        voteScore: cP.voteScore + 1
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

  addScoreChangeToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/posts/${payload.id}`, {
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

  onClickThumbsUp = () => {
    Promise.resolve(this.currentPost)
      .then(this.addThumbsUpToPost)
      .then(this.addNewScoreToStore)
      .then(this.addScoreChangeToBackEnd)
      .then(() => (this.currentPost = { ...this.props.currentPost }));
  };

  addThumbsDownToPost = cP => {
    return new Promise(resolve => {
      const payload = {
        ...cP,
        voteScore: cP.voteScore - 1
      };
      resolve(payload);
    });
  };

  onClickThumbsDown = () => {
    Promise.resolve(this.currentPost)
      .then(this.addThumbsDownToPost)
      .then(this.addNewScoreToStore)
      .then(this.addScoreChangeToBackEnd)
      .then(() => (this.currentPost = { ...this.props.currentPost }));
  };

  convertDate = inputFormat => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  render() {
    const { currentPost, comments } = this.props;
    console.log("comments on render", comments);
    console.log("currentPost", currentPost);

    return (
      <div className="well-post">
        <Well style={{ maxWidth: "50%", marginTop: "25px" }}>
          <div className="user-post">
            <div className="vote-score-post">
              <div>
                <Button bsStyle="primary" onClick={this.onClickThumbsUp}>
                  <Glyphicon glyph="thumbs-up" />
                </Button>

                <Button bsStyle="primary" onClick={this.onClickThumbsDown}>
                  <Glyphicon glyph="thumbs-down" />
                </Button>
              </div>
              <div>{`Vote Score is ${currentPost.voteScore}`}</div>
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
                {`Current number of comments ${comments.length}`}
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
                    <EditModal currentPost={currentPost} />
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

function mapStateToProps({ currentPost, modal, comments }) {
  return {
    currentPost: currentPost.currentPost,
    modal,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
