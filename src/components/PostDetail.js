import React, { Component } from "react";
import { connect } from "react-redux";
import { Well, Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { isModalOpen } from "../actions/modalActions";
import PostModal from "./PostModal";
import EditModal from "./EditModal";

class PostDetail extends Component {
  onClickEditPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
  };

  render() {
    const { currentPost, modal } = this.props;
    return (
      <div className="user-post">
        <Well style={{ maxWidth: "50%", marginTop: "25px" }}>
          <div>
            <strong>
              {currentPost.title}
            </strong>
          </div>
          <div>
            <strong>
              {currentPost.author}
            </strong>
          </div>
          <div>
            <strong>
              {currentPost.timestamp}
            </strong>
          </div>
          <div>
            <strong>
              {currentPost.voteScore}
            </strong>
          </div>
          <hr style={{ borderWidth: "2px" }} />
          {currentPost.body}
          <hr style={{ borderWidth: "2px" }} />
          <Panel
            header={
              <div className="comment-container">
                <div>
                  <Button bsStyle="primary">Primary</Button>
                </div>
                <div>
                  <Button bsStyle="primary">Primary</Button>
                </div>
                <div className="edit-comment">
                  <Button bsStyle="primary" onClick={this.onClickEditPost}>
                    Edit Post
                  </Button>
                  <EditModal
                    isOpen={modal.isModalOpen}
                    currentPost={currentPost}
                  />
                </div>
              </div>
            }
            style={{ textAlign: "left" }}
          >
            <ListGroup fill>
              <ListGroupItem>
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here
              </ListGroupItem>
              <ListGroupItem>
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here Comments will be in here Comments will be in here
                Comments will be in here Comments will be in here Comments will
                be in here
              </ListGroupItem>
            </ListGroup>
          </Panel>
        </Well>
      </div>
    );
  }
}

function mapStateToProps({ currentPost, modal }) {
  return {
    currentPost: currentPost.currentPost,
    modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // addPost: data => dispatch(addPost(data)),
    isModalOpen: data => dispatch(isModalOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
