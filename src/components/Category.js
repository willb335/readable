import React, { Component } from "react";
import { connect } from "react-redux";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import { isModalOpen } from "../actions/modalActions";
import { setCurrentCategory } from "../actions/categories";

class Category extends Component {
  clickNewPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  render() {
    const { modal, isModalOpen, catName, posts } = this.props;
    return (
      <Panel
        header={
          <div className="category-container">
            <div>
              {catName}
            </div>
            <div>Filler</div>
            <div>Filler</div>

            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button bsStyle="primary">Primary</Button>
            </div>
            <div>
              <Button bsStyle="primary" onClick={this.clickNewPost}>
                New Post
              </Button>
              <PostModal isOpen={modal.isModalOpen} />
            </div>
          </div>
        }
        style={{ textAlign: "left" }}
      >
        <ListGroup fill>
          {posts.map(
            p =>
              p.category === catName &&
              <ListGroupItem key={p.title}>
                <a onClick={console.log("clicked!")}>
                  {p.title}
                </a>
              </ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    );
  }
}
function mapStateToProps({ modal, posts }) {
  return {
    modal,
    posts: Object.values(posts)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
