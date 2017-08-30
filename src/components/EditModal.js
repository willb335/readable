import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import { isModalOpen } from "../actions/modalActions";
import { editPost, removePost } from "../actions/postActions";
import uuidv4 from "uuid/v4";

class EditModal extends Component {
  currentPost = { ...this.props.currentPost };

  onClose = payload => {
    this.props.isModalOpen({
      isModalOpen: false
    });
    payload = {};
  };

  buildPayload = cP => {
    return new Promise(resolve => {
      const randomId = uuidv4();
      const payload = cP;
      resolve(payload);
    });
  };

  addEditedPostToStore = payload => {
    return new Promise(resolve => {
      this.props.editPost(payload);
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
    return new Promise(resolve => {
      console.log("payload id", payload.id);
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

  removeCurrentPayload = payload => {
    return new Promise(resolve => {
      payload = {};
      this.currentPost = {};
      resolve(payload);
    });
  };

  onSubmit = () => {
    Promise.resolve(this.currentPost)
      .then(this.buildPayload)
      .then(this.addEditedPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.removeCurrentPayload)
      .then(() => {
        this.props.isModalOpen({ isModalOpen: false });
      });
  };

  handleAuthorChange = event => {
    this.currentPost.author = event.target.value;
  };

  handleTitleChange = event => {
    this.currentPost.title = event.target.value;
  };

  hanglePostBodyChange = event => {
    this.currentPost.body = event.target.value;
  };

  render() {
    const { isOpen } = this.props;
    console.log("currentPost", this.props.currentPost);
    return (
      <div>
        <Modal
          show={isOpen}
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
                  value={this.currentPost.author}
                  placeholder="Enter name"
                  onChange={this.handleAuthorChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  value={this.currentPost.title}
                  placeholder="Enter title"
                  onChange={this.handleTitleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
            <form className="form-input-area">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Enter Post</ControlLabel>
                <FormControl
                  value={this.currentPost.body}
                  style={{ height: "300px" }}
                  componentClass="textarea"
                  placeholder="Enter Post"
                  onChange={this.hanglePostBodyChange}
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

function mapStateToProps({ modal, posts, category }) {
  return {
    modal,
    posts,
    category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
