import React, {Component} from 'react';
import {connect} from 'react-redux';
import Profile from "../Profile";
import {fetchDeleteProfile, fetchProfile, fetchUpdateProfile, logOut} from "../../store/Profile/actions";
import {closeModal, openModal} from "../../store/Event/actions";
import EventDetails from "../Event";


class AuthorizationContainer extends Component {
    render() {
        return (<Profile isLogged={this.props.isLogged} logOut={this.props.logOut}
                         fetchProfile={this.props.fetchProfile}
                         profileInfo={this.props.profileInfo}
                         loading={this.props.loading}
                         role={this.props.role}
                         fetchUpdateProfile={this.props.fetchUpdateProfile}
                         fetchDeleteProfile={this.props.fetchDeleteProfile}
                         user_id={this.props.user_id}
                         openModal={this.props.openModal} closeModal={this.props.closeModal}
                         modalIsOpen={this.props.modalIsOpen}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        isLogged: state.app.isLogged,
        role: state.app.role,
        profileInfo: state.profile.profileInfo,
        loading: state.profile.loading,
        user_id: state.app.id,
        modalIsOpen: state.event.modalIsOpen,
    };
}

const linkActionsToProps = {
    logOut,
    fetchProfile,
    fetchUpdateProfile,
    fetchDeleteProfile,
    openModal,
    closeModal
}

export default connect(putStateToProps, linkActionsToProps)(AuthorizationContainer);

