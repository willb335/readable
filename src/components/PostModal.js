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
import { addPost } from "../actions/postActions";

class PostModal extends Component {
  state = {
    value: ""
  };

  onClose = () => {};

  onSubmit = () => {
    this.props.addPost({
      id: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1467166872634,
      title: "",
      body: "",
      author: "",
      category: "",
      voteScore: 6,
      deleted: false
    });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { isOpen, isModalOpen } = this.props;
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
                  value={this.state.value}
                  placeholder="Enter name"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter title"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
            <form className="form-input-area">
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Enter Post</ControlLabel>
                <FormControl
                  style={{ height: "300px" }}
                  componentClass="textarea"
                  placeholder="Enter Post"
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={() => isModalOpen({ isModalOpen: false })}
            >
              Submit
            </Button>
            <Button onClick={() => isModalOpen({ isModalOpen: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ modal, posts }) {
  return {
    posts,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
