import React, {Component} from 'react';
import {connect} from 'react-redux';
import Authorization from "../Authorization";
import {resetErrors, signUp} from "../../store/Authorization/actions";


class AuthorizationContainer extends Component {
    render() {
        return (<Authorization logged={this.props.logged} resetErrors={this.props.resetErrors}
                               errorMsg={this.props.errorMsg}
                               signUp={this.props.signUp}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        loading: state.authorization.loading,
        accountInfo: state.authorization.accountInfo,
        errorMsg: state.authorization.errorMsg,
        success: state.authorization.logged
    };
}

const linkActionsToProps = {
    signUp,
    resetErrors
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

