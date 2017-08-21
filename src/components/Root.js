import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

class Root extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-category">
          <Col xs={12} md={12}>
            {"Filler"}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Root;
