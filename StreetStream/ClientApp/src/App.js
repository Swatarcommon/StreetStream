import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {Layout} from './components/Layout';
import EventsListContainer from './components/containers/EventsListContainer';
import './custom.css'
import MapContainer from "./components/containers/MapContainer";
import AuthorizationContainer from "./components/containers/AuthorizationContainer";
import {NavMenu} from "./components/NavMenu";
import {NotFound} from "./components/NotFound";

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/authorization' component={LoginRoutContainer}/>
                    <Route path='/' component={DefaultRoutContainer}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        );
    };
};

class LoginRoutContainer extends Component {
    render() {
        return (
            <Route exact path='/authorization' component={AuthorizationContainer}/>
        );
    }
}

class DefaultRoutContainer extends Component {
    render() {
        return (
            <Switch>
                <div>
                    <Route exact path='/' component={MapContainer}/>
                    <Route path='/events' component={EventsListContainer}/>
                    <NavMenu/>
                </div>
            </Switch>
        );
    }
}