import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import FetchDataContainer from './components/containers/FetchDataContainer';

import './custom.css'

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/fetch-data' component={FetchDataContainer}/>
            </Layout>
        );
    };
};
