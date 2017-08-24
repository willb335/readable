import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import { isModalOpen } from "../actions/modalActions";

class Category extends Component {
  render() {
    const { modal } = this.props;
    return (
      <Panel
        header={
          <div className="category-container">
            <div>Category</div>
            <div>Filler</div>
            <div>Filler</div>

            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button bsStyle="primary" onClick={console.log("clicked")}>
                New Post
              </Button>
              <PostModal onHide={console.log("hidden")} isOpen={this} />
            </div>
          </div>
        }
        style={{ textAlign: "left" }}
      >
        <ListGroup fill>
          <ListGroupItem>Post 1</ListGroupItem>
          <ListGroupItem>Post 2</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
function mapStateToProps({ modal }) {
  return {
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
