import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import { isModalOpen, isCommentModalOpen } from "../actions/modalActions";
import { addPost } from "../actions/postActions";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { addComment } from "../actions/commentActions";

class NewCommentModal extends Component {
  currentComment = {};

  onClose = payload => {
    this.props.isCommentModalOpen({
      isCommentModalOpen: false
    });
    payload = {};
  };

  buildPayload = cC => {
    return new Promise(resolve => {
      const randomId = uuidv4();
      const payload = {
        ...cC,
        id: randomId,
        parentId: this.props.currentPost.id,
        timestamp: Date.now(),
        deleted: false,
        parentDeleted: false,
        voteScore: 0
      };
      resolve(payload);
    });
  };

  addCommentToStore = payload => {
    return new Promise(resolve => {
      this.props.addComment(payload);
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
    return new Promise(resolve => {
      fetch(`http://localhost:5001/comments`, {
        method: "post",
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
      this.currentComment = {};
      resolve(payload);
    });
  };

  onSubmit = () => {
    Promise.resolve(this.currentComment)
      .then(this.buildPayload)
      .then(this.addCommentToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.removeCurrentPayload)
      .then(() => {
        this.props.isCommentModalOpen({ isModalOpen: false });
      });
  };

  handleAuthorChange = event => {
    this.currentComment.author = event.target.value;
  };

  handlePostBodyChange = event => {
    this.currentComment.body = event.target.value;
  };

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal
          show={modal.isCommentModalOpen}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  value={this.currentComment.author}
                  placeholder="Enter name"
                  onChange={this.handleAuthorChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>

            <form className="form-input-area">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Enter Post</ControlLabel>
                <FormControl
                  value={this.currentComment.body}
                  style={{ height: "300px" }}
                  componentClass="textarea"
                  placeholder="Enter Post"
                  onChange={this.handlePostBodyChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.onSubmit}>
              Submit
            </Button>
            <Button onClick={this.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ modal, posts, category, currentPost }) {
  return {
    modal,
    posts,
    category,
    currentPost: currentPost.currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data)),
    addComment: data => dispatch(addComment(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewCommentModal)
);
