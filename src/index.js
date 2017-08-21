import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import Post from "./components/Post";

ReactDOM.render(<Post />, document.getElementById("root"));
registerServiceWorker();
