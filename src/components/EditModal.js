import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import { editPost, removePost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import uuidv4 from "uuid/v4";

class EditModal extends Component {
  currentPost = { ...this.props.currentPost };

  componentDidMount() {
    this.props.editAuthor({ author: this.currentPost.author });

    this.props.editTitle({ title: this.currentPost.title });

    this.props.editBody({ body: this.currentPost.body });
  }

  onClose = payload => {
    this.props.isModalOpen({
      isModalOpen: false
    });
    payload = {};
  };

  buildPayload = cP => {
    return new Promise(resolve => {
      console.log("building payload", cP);
      const randomId = uuidv4();
      const payload = {
        ...cP,
        title: this.props.form.title,
        author: this.props.form.name,
        body: this.props.form.body,
        timestamp: Date.now(),
        deleted: false
      };
      resolve(payload);
    });
  };

  addEditedPostToStore = payload => {
    return new Promise(resolve => {
      console.log("adding edited payload to store");
      this.props.editPost(payload);
      this.props.setCurrentPost({ currentPost: payload });
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

  closeModal = () => {
    return new Promise(resolve => {
      this.props.isModalOpen({ isModalOpen: false });
      this.props.isPostDetailOpen({ isPostDetailOpen: false });
      resolve();
    });
  };

  onSubmit = () => {
    Promise.resolve(this.currentPost)
      .then(this.buildPayload)
      .then(this.addEditedPostToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.removeCurrentPayload)
      .then(this.closeModal);
  };

  handleAuthorChange = event => {
    this.editAuthor({ author: event.target.value });
  };

  handleTitleChange = event => {
    this.editTitle({ title: event.target.data });
  };

  hanglePostBodyChange = event => {
    this.editBody({ body: event.target.data });
  };

  render() {
    const { modal, currentPost, form } = this.props;
    console.log("author", this.currentPost.author);
    return (
      <div>
        <Modal
          show={modal.isModalOpen}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  value={form.author}
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
                  value={form.title}
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
                  value={form.body}
                  style={{ height: "300px" }}
                  componentClass="textarea"
                  placeholder="Enter Post"
                  onChange={this.hanglePostBodyChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`/${currentPost.category}`} onClick={this.onSubmit}>
              <Button bsStyle="primary">Submit</Button>
            </Link>

            <Button onClick={this.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ modal, posts, category, currentPost, form }) {
  return {
    modal,
    posts,
    category,
    form,
    currentPost: currentPost.currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
