import React, { Component } from "react";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

class Category extends Component {
  render() {
    return (
      <Panel header={"Category"}>
        <ListGroup fill>
          <ListGroupItem>Post 1</ListGroupItem>
          <ListGroupItem>Post 2</ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}

export default Category;
