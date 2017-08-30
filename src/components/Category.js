import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Panel, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PostModal from "./PostModal";
import { isModalOpen } from "../actions/modalActions";
import { isPostDetailOpen } from "../actions/postDetailActions";
import { isCategoryOpen, setCurrentCategory } from "../actions/categories";
import { setCurrentPost } from "../actions/postActions";
import { withRouter } from "react-router-dom";

class Category extends Component {
  onClickNewPost = () => {
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
    const { modal, catName, posts } = this.props;
    const sortedPosts = posts.sort((b, a) => a.voteScore - b.voteScore);

    return (
      <div>
        <Panel
          header={
            <div className="category-container">
              <Link
                to={`/${catName}`}
                onClick={this.clickCategory}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {catName}
              </Link>

              <div>Filler</div>
              <div>Filler</div>

              <div>
                <Button bsStyle="primary">Primary</Button>
              </div>
              <div>
                <Button bsStyle="primary">Primary</Button>
              </div>
              <div>
                <Link to={`/newpost`} onClick={this.onClickNewPost}>
                  <Button bsStyle="primary">New Post</Button>
                </Link>

                <PostModal isOpen={modal.isModalOpen} />
              </div>
            </div>
          }
          style={{ textAlign: "left" }}
        >
          <div className="list-group-item">
            <ListGroup fill>
              {sortedPosts.map(
                p =>
                  p.category === catName &&
                  !p.deleted &&
                  <ListGroupItem key={p.title}>
                    <div>
                      <Link
                        to={`/${p.category}/${p.title}`}
                        onClick={() => this.clickPost(p)}
                        style={{ cursor: "pointer" }}
                      >
                        {p.title}
                      </Link>
                    </div>
                  </ListGroupItem>
              )}
            </ListGroup>
          </div>
        </Panel>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Category)
);
