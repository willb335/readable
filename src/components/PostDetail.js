import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Well,
  Panel,
  ListGroup,
  ListGroupItem,
  Button,
  Glyphicon
} from "react-bootstrap";
import { isModalOpen } from "../actions/modalActions";
import EditModal from "./EditModal";
import { editPost, removePost } from "../actions/postActions";
import { setCurrentPost } from "../actions/postActions";
import { withRouter } from "react-router-dom";

class PostDetail extends Component {
  currentPost = { ...this.props.currentPost };

  onClickEditPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
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

  removeCurrentPayload = payload => {
    return new Promise(resolve => {
      payload = {};
      this.currentPost = {};
      resolve(payload);
    });
  };

  onClickDeletePost = () => {
    Promise.resolve(this.currentPost)
      .then(this.deletePost)
      .then(this.addDeletedPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.removeCurrentPayload)
      .then(() => this.props.history.push(`/`));
  };

  render() {
    const { currentPost } = this.props;
    return (
      <div className="well-post">
        <Well style={{ maxWidth: "50%", marginTop: "25px" }}>
          <div className="user-post">
            <div className="vote-score-post">
              <div>
                <Button bsStyle="primary">
                  <Glyphicon glyph="thumbs-up" />
                </Button>

                <Button bsStyle="primary">
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
                {currentPost.timestamp}
              </strong>
            </div>
            <div>
              <strong>
                {currentPost.voteScore}
              </strong>
            </div>
            <hr style={{ borderWidth: "2px" }} />
            {currentPost.body}
            <hr style={{ borderWidth: "2px" }} />
            <Panel
              header={
                <div className="comment-container">
                  <div>
                    <Button bsStyle="primary">Primary</Button>
                  </div>
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
            >
              <ListGroup fill>
                <ListGroupItem>
                  Comments will be in here Comments will be in here Comments
                  will be in here Comments will be in here Comments will be in
                  here
                </ListGroupItem>
                <ListGroupItem>
                  Comments will be in here Comments will be in here Comments
                  will be in here Comments will be in here Comments will be in
                  here
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </div>
        </Well>
      </div>
    );
  }
}

function mapStateToProps({ currentPost, modal }) {
  return {
    currentPost: currentPost.currentPost,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);
