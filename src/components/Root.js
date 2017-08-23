import React, { Component } from "react";
import { addPost, removePost, editPost } from "../actions";
import { Grid, Row, Col } from "react-bootstrap";
import Category from "./Category";

class Root extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-category">
          <Col xs={12} md={12}>
            <Category />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ food, calendar }) {
  const dayOrder = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? food[calendar[day][meal]] : null;

        return meals;
      }, {})
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    removePost: data => dispatch(removePost(data)),
    editPost: data => dispatch(editPost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
