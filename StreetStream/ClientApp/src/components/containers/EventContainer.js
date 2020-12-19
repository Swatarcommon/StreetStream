import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeModal, fetchDeleteEvent, fetchEventById, fetchUpdateEvent, openModal} from "../../store/Event/actions";
import EventDetails from "../Event";
import {fetchCategories} from "../../store/Map/actions";


class EventContainer extends Component {
    render() {
        return (<EventDetails loading={this.props.loading} event={this.props.event}
                              fetchEventById={this.props.fetchEventById} eventId={this.props.eventId}
                              fetchUpdateEvent={this.props.fetchUpdateEvent}
                              placemark={this.props.placemark}
                              categoryEvent={this.props.categoryEvent}
                              commercialAccount={this.props.commercialAccount}
                              user_id={this.props.user_id} modalIsOpen={this.props.modalIsOpen}
                              openModal={this.props.openModal} closeModal={this.props.closeModal}
                              role={this.props.role}
                              fetchCategories={this.props.fetchCategories}
                              categories={this.props.categories}
                              fetchDeleteEvent={this.props.fetchDeleteEvent}/>)
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        event: state.event.event,
        user_id: state.app.id,
        role: state.app.role,
        loading: state.event.loading,
        placemark: state.event.placemark,
        modalIsOpen: state.event.modalIsOpen,
        commercialAccount: state.event.commercialAccount,
        categoryEvent: state.event.categoryEvent,
        eventId: ownProps.match.params.id,
        categories: state.map.categories
    };
}

const linkActionsToProps = {
    fetchEventById,
    fetchCategories,
    fetchUpdateEvent,
    fetchDeleteEvent,
    openModal,
    closeModal
}

export default connect(putStateToProps, linkActionsToProps)(EventContainer);

