import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isModalOpen, isEditPostModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import { editPost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import { setCurrentCategory } from "../actions/categories";

class EditPostModal extends Component {
  currentPost = { ...this.props.currentPost };

  componentDidMount() {}

  onClose = payload => {
    this.props.isEditPostModalOpen({
      isEditPostModalOpen: false
    });
    this.props.history.push(`/`);
    payload = {};
  };

  buildPayload = cP => {
    return new Promise(resolve => {
      const payload = {
        ...cP,
        title: this.props.form.title,
        author: this.props.form.author,
        body: this.props.form.body,
        timestamp: Date.now()
      };
      resolve(payload);
    });
  };

  addEditedPostToStore = payload => {
    return new Promise(resolve => {
      this.props.editPost(payload);
      this.props.setCurrentPost({ currentPost: payload });
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
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

  removeCurrentPayload = payload => {
    return new Promise(resolve => {
      payload = {};
      resolve(payload);
    });
  };

  closeModal = () => {
    return new Promise(resolve => {
      this.props.isEditPostModalOpen({ isEditPostModalOpen: false });
      this.props.isPostDetailOpen({ isPostDetailOpen: false });
      this.props.setCurrentCategory({
        currentCategory: this.props.currentPost.category
      });
      this.props.history.push(`/`);
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
    this.props.editAuthor({ author: event.target.value });
  };

  handleTitleChange = event => {
    this.props.editTitle({ title: event.target.value });
  };

  hanglePostBodyChange = event => {
    this.props.editBody({ body: event.target.value });
  };

  render() {
    const { modal, currentPost, form } = this.props;
    return (
      <div>
        <Modal
          show={modal.isEditPostModalOpen}
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
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data)),
    isEditPostModalOpen: data => dispatch(isEditPostModalOpen(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPostModal)
);
