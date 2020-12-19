import React, {Component} from 'react';
import {connect} from 'react-redux';
import CommercialAccountsList from "../CommercialAccountsList";
import {fetchAccounts} from "../../store/CommercalAccountsList/actions";


class CommercialAccountsListContainer extends Component {
    render() {
        return (<CommercialAccountsList loading={this.props.loading} accounts={this.props.accounts}
                                        fetchAccounts={this.props.fetchAccounts}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        accounts: state.commercialaccounts.accounts,
        loading: state.commercialaccounts.loading,
        errorMsg: state.commercialaccounts.errorMsg
    };
}

const linkActionsToProps = {
    fetchAccounts
}

export default connect(putStateToProps, linkActionsToProps)(CommercialAccountsListContainer);

