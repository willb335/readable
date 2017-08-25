import React, { Component } from "react";
import { connect } from "react-redux";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import { isModalOpen } from "../actions/modalActions";

class Category extends Component {
  render() {
    const { modal, isModalOpen, catName } = this.props;
    return (
      <Panel
        header={
          <div className="category-container">
            <div>
              {catName}
            </div>
            <div>Filler</div>
            <div>Filler</div>

            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button
                bsStyle="primary"
                onClick={() => isModalOpen({ isModalOpen: true })}
              >
                New Post
              </Button>
              <PostModal
                onHide={console.log("hidden")}
                isOpen={modal.isModalOpen}
              />
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
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
