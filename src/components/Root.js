import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Root extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-category">
          <Col xs={12} md={12}>
            Testing
            <Category />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Root;
