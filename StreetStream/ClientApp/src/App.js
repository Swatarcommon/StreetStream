import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {Layout} from './components/Layout';
import EventsListContainer from './components/containers/EventsListContainer';
import './custom.css'
import MapContainer from "./components/containers/MapContainer";
import AuthorizationContainer from "./components/containers/AuthorizationContainer";
import {NotFound} from "./components/NotFound";
import {Redirect} from "react-router-dom";
import NavMenuContainer from "./components/containers/NavMenuContainer";
import ProfileContainer from "./components/containers/ProfileContainer";

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    {this.props.isLogged === true ? <Redirect from="/authorization" to="/"/> :
                        <Redirect from="/profile" to="/authorization"/>}
                    <Route exact path='/authorization' component={LoginRoutContainer}/>
                    <Route path='/' component={DefaultRoutContainer}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        )
    }
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
                    <Route exact path='/profile' component={ProfileContainer}/>
                    <NavMenuContainer/>
                </div>
            </Switch>
        );
    }
}