import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuidv4 from "uuid/v4";
import { isModalOpen } from "../actions/modalActions";
import { addPost } from "../actions/postActions";

class NewPostModal extends Component {
  newPost = {};

  onSubmit = () => {
    Promise.resolve(this.newPost)
      .then(this.validateNewPost)
      .then(this.buildPayload)
      .then(this.addPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.onClose)
      .catch(e => console.log(e));
  };

  validateNewPost = newPost => {
    return new Promise((resolve, reject) => {
      if (newPost.author && newPost.title && newPost.body) {
        resolve(newPost);
      } else {
        window.alert("Please fill in all the fields");
        reject("Failure");
      }
    });
  };

  buildPayload = newPost => {
    return new Promise(resolve => {
      const randomId = uuidv4();
      const payload = {
        ...newPost,
        id: randomId,
        timestamp: Date.now(),
        category: this.props.category.currentCategory,
        deleted: false,
        voteScore: 0
      };
      resolve(payload);
    });
  };

  addPostToStore = payload => {
    return new Promise(resolve => {
      this.props.addPost(payload);
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
    return new Promise(resolve => {
      fetch("http://localhost:5001/posts", {
        method: "post",
        headers: {
          Authorization: "will335",
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(response => resolve(payload));
    });
  };

  onClose = () => {
    return new Promise(resolve => {
      this.newPost = {};
      this.props.isModalOpen({
        isModalOpen: false
      });
      this.props.history.push(`/${this.props.category.currentCategory}`);
      resolve("Success");
    });
  };

  handleAuthorChange = event => {
    this.newPost.author = event.target.value;
  };

  handleTitleChange = event => {
    this.newPost.title = event.target.value;
  };

  hanglePostBodyChange = event => {
    this.newPost.body = event.target.value;
  };

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal
          show={modal.isModalOpen}
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
                  value={this.newPost.author}
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
                  value={this.newPost.title}
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
                  value={this.newPost.body}
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

function mapStateToProps({ modal, category }) {
  return {
    modal,
    category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewPostModal)
);
