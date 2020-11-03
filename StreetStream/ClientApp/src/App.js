import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {Layout} from './components/Layout';
import EventsListContainer from './components/containers/EventsListContainer';
import './custom.css'
import MapContainer from "./components/containers/MapContainer";

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={MapContainer}/>
                    <Route path='/events' component={EventsListContainer}/>
                </Switch>
            </Layout>
        );
    };
};
