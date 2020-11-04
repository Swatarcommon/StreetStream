import React, {Component} from 'react';
import {connect} from 'react-redux';
import Authorization from "../Authorization";
import {sendVerificationCode, signUp} from "../../store/Authorization/actions";


class AuthorizationContainer extends Component {
    render() {
        return (<Authorization sendVerificationCode={this.props.sendVerificationCode} signUp={this.props.signUp}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        loading: state.authorization.loading,
        accountInfo: state.authorization.accountInfo,
        errorMsg: state.authorization.errorMsg
    };
}

const linkActionsToProps = {
    signUp,
    sendVerificationCode
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

