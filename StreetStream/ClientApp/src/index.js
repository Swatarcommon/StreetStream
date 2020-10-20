import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from "./components/containers/AppContainer";
import {applyMiddleware, createStore} from "redux";
import rootReducers from './store/reducers';
import {Provider} from "react-redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";

const logger = createLogger;
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <AppContainer/>
        </BrowserRouter>
    </Provider>,
    rootElement);

registerServiceWorker();

