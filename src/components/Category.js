import React, { Component } from "react";
import { connect } from "react-redux";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { isModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import { isCategoryOpen, setCurrentCategory } from "../actions/categories";
import { setCurrentPost } from "../actions/postActions";

class Category extends Component {
  clickNewPost = () => {
    this.props.isModalOpen({ isModalOpen: true });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  clickPost = p => {
    this.props.setCurrentPost({ currentPost: p });
    this.props.isPostDetailOpen({ isPostDetailOpen: true });
  };

  clickCategory = () => {
    this.props.isCategoryOpen({ isCategoryOpen: true });
    this.props.setCurrentCategory({ currentCategory: this.props.catName });
  };

  render() {
    const { modal, catName, posts, postDetail } = this.props;
    return (
      <div>
        {postDetail.isPostDetailOpen
          ? <PostDetail />
          : <Panel
              header={
                <div className="category-container">
                  <a
                    onClick={this.clickCategory}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {catName}
                  </a>
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
                      {console.log("p", p)}
                      <a
                        onClick={() => this.clickPost(p)}
                        style={{ cursor: "pointer" }}
                      >
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
function mapStateToProps({ modal, posts, postDetail, category, currentPost }) {
  return {
    modal,
    posts: Object.values(posts),
    postDetail,
    category,
    currentPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    isModalOpen: data => dispatch(isModalOpen(data)),
    setCurrentCategory: data => dispatch(setCurrentCategory(data)),
    isPostDetailOpen: data => dispatch(isPostDetailOpen(data)),
    isCategoryOpen: data => dispatch(isCategoryOpen(data)),
    setCurrentPost: data => dispatch(setCurrentPost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
