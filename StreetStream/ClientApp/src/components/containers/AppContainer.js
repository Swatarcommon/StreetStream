import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from "../../App";

class AppContainer extends Component {
    render() {
        return (<App/>)
    }
}

const putStateToProps = (state) => {
    console.log(state);
    return {
        isLogged: state.app.isLogged,
    };
}

const linkActionsToProps = {}

export default connect(putStateToProps, linkActionsToProps)(AppContainer);

