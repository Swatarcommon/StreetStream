import React, {Component} from 'react';
import {connect} from 'react-redux';
import Authorization from "../Authorization";
import {logIn, resetErrors, signUp} from "../../store/Authorization/actions";


class AuthorizationContainer extends Component {
    render() {
        return (<Authorization isLogged={this.props.isLogged} resetErrors={this.props.resetErrors}
                               errorMsg={this.props.errorMsg}
                               signUp={this.props.signUp}
                               logIn={this.props.logIn}
                               isSignUp={this.props.isSignUp}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        isSignUp: state.authorization.isSignUp,
        loading: state.authorization.loading,
        accountInfo: state.authorization.accountInfo,
        errorMsg: state.authorization.errorMsg,
        isLogged: state.app.isLogged
    };
}

const linkActionsToProps = {
    signUp,
    logIn,
    resetErrors
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

