import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from "../../App";
import {isLogginCheck} from "../../store/App/actions";

class AppContainer extends Component {
    componentWillMount() {
        this.props.isLogginCheck();
    }

    render() {
        return (<App isLogged={this.props.isLogged}/>)
    }
}

const putStateToProps = (state) => {
    return {
        isLogged: state.app.isLogged,
    };
}

const linkActionsToProps = {
    isLogginCheck
}

export default connect(putStateToProps, linkActionsToProps)(AppContainer);

