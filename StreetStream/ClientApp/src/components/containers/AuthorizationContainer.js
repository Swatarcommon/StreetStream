import React, {Component} from 'react';
import {connect} from 'react-redux';
import Authorization from "../Authorization";
import {
    logIn,
    resetErrors,
    setAccountType,
    signUpByCommercial,
    signUpByRegular
} from "../../store/Authorization/actions";


class AuthorizationContainer extends Component {
    render() {
        return (<Authorization isLogged={this.props.isLogged} resetErrors={this.props.resetErrors}
                               errorMsg={this.props.errorMsg}
                               signUpByCommercial={this.props.signUpByCommercial}
                               signUpByRegular={this.props.signUpByRegular}
                               logIn={this.props.logIn}
                               isSignUp={this.props.isSignUp}
                               setAccountType={this.props.setAccountType}
                               accountType={this.props.accountType}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        isSignUp: state.authorization.isSignUp,
        loading: state.authorization.loading,
        accountInfo: state.authorization.accountInfo,
        errorMsg: state.authorization.errorMsg,
        accountType: state.authorization.accountType,
        isLogged: state.app.isLogged
    };
}

const linkActionsToProps = {
    signUpByCommercial,
    signUpByRegular,
    logIn,
    resetErrors,
    setAccountType
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

