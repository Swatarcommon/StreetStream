import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavMenu} from "../NavMenu";


class NavMenuContainer extends Component {
    render() {
        return (<NavMenu isLogged={this.props.isLogged}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    console.log("NAVMENU_STATE_LOGGED = ", state.app.isLogged);
    return {
        isLogged: state.app.isLogged
    };
}

const linkActionsToProps = {}

export default connect(putStateToProps, linkActionsToProps)(NavMenuContainer);

