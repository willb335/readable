import React, { Component } from "react";
import { Navbar, Nav, MenuItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setCurrentCategory } from "../actions/categories";

class TopNavbar extends Component {
  clickCategory = c => {
    this.props.setCurrentCategory({ currentCategory: c });
  };

  render() {
    const { categories, fetchRequests } = this.props;
    console.log("cat", categories);
    return (
      <div>
        {fetchRequests.isComplete && (
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to={"/"} style={{ cursor: "pointer", color: "#337ab7" }}>
                  Readable
                </Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavDropdown
                eventKey={3}
                title="Categories"
                id="basic-nav-dropdown"
              >
                {categories.map((c, i) => (
                  <LinkContainer
                    to={`/${c}`}
                    onClick={() => this.clickCategory(c)}
                    style={{ cursor: "pointer", color: "#337ab7" }}
                    key={i}
                  >
                    <MenuItem eventKey={`${3}.${i}`}>{c}</MenuItem>
                  </LinkContainer>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar>
        )}
      </div>
    );
  }
}

function mapStateToProps({ fetchRequests }) {
  return {
    fetchRequests
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentCategory: data => dispatch(setCurrentCategory(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
);
