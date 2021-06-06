import React from 'react';
import {render} from 'react-dom';
import './main.css';
import './media.css';
import App from './App';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from "./redux/reducers/rootReducer";
import {Provider} from "react-redux";
import {sagaWatcher} from "./redux/sagas";

// eslint-disable-next-line no-unused-vars
const saga = createSagaMiddleware();
// CHECKING FOR DEVTOOLS
const isChromium = window.chrome;
const winNav = window.navigator;
const vendorName = winNav.vendor;
const isOpera = typeof window.opr !== "undefined";
const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
const isIOSChrome = winNav.userAgent.match("CriOS");
let devtools;
if (isIOSChrome) {
  devtools = f => f
} else if(
  process.env.NODE_ENV !== 'production' &&
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
} else {
  devtools = f => f
}
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, saga),
  devtools
))

saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));
