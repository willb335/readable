import React, { Component } from "react";
import { Well, Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";

class PostDetail extends Component {
  render() {
    return (
      <div className="user-post">
        <Well style={{ maxWidth: "50%", marginTop: "25px" }}>
          {/* <Panel> */}
          <div>
            <strong>Title</strong>
          </div>
          <div>
            <strong>Author</strong>
          </div>
          <div>
            <strong>Posted</strong>
          </div>
          <div>
            <strong>Votes</strong>
          </div>
          <hr style={{ borderWidth: "2px" }} />
          This is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will go
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will go
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
                  <Button bsStyle="primary" onClick={console.log("clicked")}>
                    New Post
                  </Button>
                  <PostModal onHide={console.log("hidden")} />
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

export default PostDetail;
