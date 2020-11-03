import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import  SERVER_URL from '../config.json';
export default class EventsList extends Component {
    componentWillMount() {
        this.loadEvents();
    }

    static renderForecastsTable(events) {
        // let imgUrl = SERVER_URL + '/api/images/' + game.gameImages[0].imageNameNavigation.name + game.gameImages[0].imageNameNavigation.format;
        let imgUrl = SERVER_URL + '/api/images/' + '1.jpg';
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                {events.map(event =>
                    <tr key={event.id}>
                        <td>{event.name}</td>
                        <td>{event.date}</td>
                        <td>{event.duration}</td>
                        <td>{event.commercialAccount.email}</td>
                        <td>
                            <Link className="text-dark"  to={`/?x=${event.placemark.x}&y=${event.placemark.y}`}>On Map</Link>
                        </td>
                    </tr>
                )}
                {events.map(event =>
                <Card inverse>
                    <CardImg width="100%" src={imgUrl} alt="Card image cap" />
                    <CardImgOverlay>
                        <CardTitle>{event.name}</CardTitle>
                        <CardText>Event date {event.date}</CardText>
                    </CardImgOverlay>
                </Card>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.props.loading === true
            ? <p><em>Loading...</em></p>
            : EventsList.renderForecastsTable(this.props.events);

        return (
            <div>
                <h1 id="tabelLabel">Events</h1>
                {contents}
            </div>
        );
    }

    async loadEvents() {
        this.props.fetchEvents();
    }
}