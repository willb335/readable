import React, { Component } from "react";
import { connect } from "react-redux";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { isModalOpen } from "../actions/modalActions";
import { setCurrentCategory } from "../actions/categories";
import { isPostDetailOpen } from "../actions/postDetailActions";

class Category extends Component {
  clickNewPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  clickPost = () => {
    this.props.isPostDetailOpen({ isPostDetailOpen: true });
  };

  render() {
    const { modal, isModalOpen, catName, posts, postDetail } = this.props;
    return (
      <div>
        {postDetail.isPostDetailOpen
          ? <PostDetail />
          : <Panel
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
                      <a onClick={this.clickPost}>
                        {p.title}
                      </a>
                    </ListGroupItem>
                )}
              </ListGroup>
            </Panel>}
      </div>
    );
  }
}
function mapStateToProps({ modal, posts, postDetail }) {
  return {
    modal,
    posts: Object.values(posts),
    postDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
