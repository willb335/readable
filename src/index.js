import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import PostDetail from "./components/PostDetail";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
