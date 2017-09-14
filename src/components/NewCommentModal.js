import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import { isCommentModalOpen } from "../actions/modalActions";
import { addComment } from "../actions/commentActions";

class NewCommentModal extends Component {
  newComment = {};

  onSubmit = () => {
    Promise.resolve(this.newComment)
      .then(this.buildPayload)
      .then(this.addCommentToStore)
      .then(this.postPayloadToBackEnd)
      .then(this.onClose);
  };

  buildPayload = newComment => {
    return new Promise(resolve => {
      const randomId = uuidv4();
      const payload = {
        ...newComment,
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
      fetch(
        "https://ul3cjjg9oi.execute-api.us-west-2.amazonaws.com/dev/comments",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      ).then(() => resolve("Success"));
    });
  };

  onClose = () => {
    return new Promise(resolve => {
      this.props.isCommentModalOpen({
        isCommentModalOpen: false
      });
      this.newComment = {};
      resolve("Success");
    });
  };

  handleAuthorChange = event => {
    this.newComment.author = event.target.value;
  };

  handlePostBodyChange = event => {
    this.newComment.body = event.target.value;
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
            <Modal.Title id="contained-modal-title-lg">New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  componentClass="textarea"
                  value={this.newComment.author}
                  placeholder="Enter name"
                  onChange={this.handleAuthorChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>

            <form className="form-input-area">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Enter Comment</ControlLabel>
                <FormControl
                  value={this.newComment.body}
                  style={{ height: "300px" }}
                  componentClass="textarea"
                  placeholder="Enter Comment"
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

function mapStateToProps({ modal, currentPost }) {
  return {
    modal,
    currentPost: currentPost.currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data)),
    isCommentModalOpen: data => dispatch(isCommentModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentModal);
