import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import FetchDataContainer from './components/containers/FetchDataContainer';
import './custom.css'
import Map from "./components/Map";

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Map}/>
                <Route path='/fetch-data' component={FetchDataContainer}/>
            </Layout>
        );
    };
};
