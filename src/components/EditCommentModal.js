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
import {
  isModalOpen,
  isEditCommentModalOpen,
  isCommentModalOpen
} from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import { editPost, removePost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { editComment, setCurrentComment } from "../actions/commentActions";
import { setCurrentPost } from "../actions/postActions";
import { isCategoryOpen, setCurrentCategory } from "../actions/categories";
import { withRouter } from "react-router-dom";

class EditCommentModal extends Component {
  componentDidMount() {}

  setCurrentComment = currentComment => {
    return new Promise(resolve => {
      const payloadComment = { ...currentComment };
      resolve(payloadComment);
    });
  };

  buildPayload = payloadComment => {
    return new Promise(resolve => {
      const payload = {
        ...payloadComment,
        title: this.props.form.title,
        author: this.props.form.author,
        body: this.props.form.body,
        timestamp: Date.now()
      };
      resolve(payload);
    });
  };

  addEditedCommentToStore = payload => {
    return new Promise(resolve => {
      this.props.editComment(payload);
      this.props.setCurrentComment({ currentComment: payload });
      resolve(payload);
    });
  };

  postPayloadToBackEnd = payload => {
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

  closeModal = payload => {
    return new Promise(resolve => {
      payload = {};
      this.props.isEditCommentModalOpen({
        isModalOpen: false
      });
      resolve();
    });
  };

  onSubmit = () => {
    Promise.resolve(this.props.currentComment)
      .then(this.buildPayload)
      .then(this.addEditedCommentToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.closeModal);
  };

  handleAuthorChange = event => {
    this.props.editAuthor({ author: event.target.value });
  };

  handleTitleChange = event => {
    this.props.editTitle({ title: event.target.value });
  };

  handlePostBodyChange = event => {
    this.props.editBody({ body: event.target.value });
  };

  render() {
    const { modal, currentPost, form } = this.props;
    return (
      <div>
        <Modal
          show={modal.isEditCommentModalOpen}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Edit Comment
            </Modal.Title>
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

            <form className="form-input-area">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Enter Post</ControlLabel>
                <FormControl
                  value={form.body}
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

            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({
  modal,
  posts,
  category,
  currentPost,
  form,
  currentComment
}) {
  return {
    modal,
    posts,
    category,
    form,
    currentPost: currentPost.currentPost,
    currentComment: currentComment.currentComment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: data => dispatch(editPost(data)),
    removePost: data => dispatch(removePost(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    editComment: data => dispatch(editComment(data)),
    setCurrentComment: data => dispatch(setCurrentComment(data)),
    isModalOpen: data => dispatch(isModalOpen(data)),
    isEditCommentModalOpen: data => dispatch(isEditCommentModalOpen(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data)),
    isCategoryOpen: data => dispatch(isCategoryOpen(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCommentModal)
);
