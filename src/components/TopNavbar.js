import React, { Component } from "react";
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Comment from "./Comment";
import EditPostModal from "./EditPostModal";
import { withRouter } from "react-router-dom";
import { isEditPostModalOpen } from "../actions/modalActions";
import { editPost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import { editComment } from "../actions/commentActions";

class TopNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"} style={{ cursor: "pointer", color: "#337ab7" }}>
              Readable
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {/* <NavItem eventKey={1} href="#">
            Link
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem> */}
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps({ currentPost, comments }) {
  return {
    currentPost: currentPost.currentPost,
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isEditPostModalOpen: data => dispatch(isEditPostModalOpen(data)),
    editPost: data => dispatch(editPost(data)),
    editComment: data => dispatch(editComment(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data)),
    editAuthor: data => dispatch(editAuthor(data)),
    editTitle: data => dispatch(editTitle(data)),
    editBody: data => dispatch(editBody(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
);
