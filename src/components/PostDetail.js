import React, { Component } from "react";
import { Well, Panel } from "react-bootstrap";

class PostDetail extends Component {
  render() {
    return (
      <div className="user-post">
        <Well style={{ maxWidth: "50%", marginTop: "25px" }}>
          {/* <Panel> */}
          <div>
            <strong>Title</strong>
          </div>
          <div>
            <strong>Author</strong>
          </div>
          <div>
            <strong>Posted</strong>
          </div>
          <div>
            <strong>Votes</strong>
          </div>
          <hr style={{ borderWidth: "2px" }} />
          {/* </Panel> */}
          This is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will
          goThis is where all the text will goThis is where all the text will go
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will goThis is where all the
          text will goThis is where all the text will go
          <hr style={{ borderWidth: "2px" }} />
          <Panel>
            <div>
              Comments will be in here Comments will be in here Comments will be
              in here Comments will be in here Comments will be in here Comments
              will be in here Comments will be in here Comments will be in here
              Comments will be in here Comments will be in here Comments will be
              in here Comments will be in here Comments will be in here Comments
              will be in here Comments will be in here Comments will be in here
              Comments will be in here Comments will be in here
            </div>
          </Panel>
        </Well>
      </div>
    );
  }
}

export default PostDetail;
