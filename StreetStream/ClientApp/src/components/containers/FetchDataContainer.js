import React, {Component} from 'react';import {connect} from 'react-redux';import FetchData from "../FetchData";import {fetchEvents} from "../../store/FetchData/actions";import {setPosition} from "../../store/Map/actions";class FetchDataContainer extends Component {    render() {        return (<FetchData loading={this.props.loading} events={this.props.events}                           fetchEvents={this.props.fetchEvents} setPosition={this.props.setPosition}/>)    }}const putStateToProps = (state, ownProps) => {    return {        events: state.fetchdata.events,        loading: state.fetchdata.loading    };}const linkActionsToProps = {    fetchEvents,    setPosition}export default connect(putStateToProps, linkActionsToProps)(FetchDataContainer);