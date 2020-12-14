import React, {Component} from 'react';
import {connect} from 'react-redux';
import Profile from "../Profile";
import {fetchProfile, logOut} from "../../store/Profile/actions";


class AuthorizationContainer extends Component {
    render() {
        return (<Profile isLogged={this.props.isLogged} logOut={this.props.logOut}
                         fetchProfile={this.props.fetchProfile}
                         profileInfo={this.props.profileInfo}
                         loading={this.props.loading}
                         role={this.props.role}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        isLogged: state.app.isLogged,
        role: state.app.role,
        profileInfo: state.profile.profileInfo,
        loading: state.profile.loading,
    };
}

const linkActionsToProps = {
    logOut,
    fetchProfile
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

