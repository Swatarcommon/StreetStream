import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProfile, logOut} from "../../store/Profile/actions";
import CommercialAccount from "../CommercialAccount";
import {fetchCommercialAccount, subscribe, unSubscribe} from "../../store/CommercialAccount/actions";


class CommercialAccountContainer extends Component {
    render() {
        return (<CommercialAccount isLogged={this.props.isLogged} logOut={this.props.logOut}
                                   fetchCommercialAccount={this.props.fetchCommercialAccount}
                                   profileInfo={this.props.profileInfo}
                                   loading={this.props.loading}
                                   role={this.props.role}
                                   user_id={this.props.user_id}
                                   commercialAccountId={this.props.commercialAccountId}
                                   subscribe={this.props.subscribe}
                                   unSubscribe={this.props.unSubscribe}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        isLogged: state.app.isLogged,
        role: state.app.role,
        profileInfo: state.commercialaccount.profileInfo,
        loading: state.commercialaccount.loading,
        errorMsg: state.commercialaccount.errorMsg,
        user_id: state.app.id,
        commercialAccountId: ownProps.match.params.id,
    };
}

const linkActionsToProps = {
    fetchCommercialAccount,
    subscribe,
    unSubscribe
}

export default connect(putStateToProps, linkActionsToProps)(CommercialAccountContainer);

