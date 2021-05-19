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
const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, saga),
  window.navigator.userAgent.includes('Chrome')
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose
))

saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));
