import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";

class PostModal extends Component {
  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { isOpen } = this.props;
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
            <Button bsStyle="primary" onClick={console.log("submit")}>
              Submit
            </Button>
            <Button onClick={console.log("close")}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PostModal;
