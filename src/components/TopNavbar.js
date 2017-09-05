import React, { Component } from "react";
import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Comment from "./Comment";
import EditPostModal from "./EditPostModal";
import { withRouter } from "react-router-dom";
import { isEditPostModalOpen } from "../actions/modalActions";
import { editPost } from "../actions/postActions";
import { editTitle, editBody, editAuthor } from "../actions/editFormAction";
import { setCurrentPost } from "../actions/postActions";
import { editComment } from "../actions/commentActions";
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

function mapStateToProps({ currentPost, comments, category, fetchRequests }) {
  return {
    currentPost: currentPost.currentPost,
    comments,
    category,
    fetchRequests
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
    editBody: data => dispatch(editBody(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
);
