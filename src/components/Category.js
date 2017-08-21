import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";

class Category extends Component {
  render() {
    return (
      <Panel
        header={
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>Category</div>
            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div style={{ float: "right" }}>
              <Button bsStyle="primary">Primary</Button>
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

export default Category;
