import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
// import PostDetail from "./components/PostDetail";
// import PostModal from "./components/PostModal";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/index";
import { Provider } from "react-redux";

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
