import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class FetchData extends Component {
    componentWillMount() {
        this.loadEvents();
    }

    static renderForecastsTable(events, setPosition) {
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
                            <Link className="text-dark" to={{pathname:'/', targetPlacemark:{x: event.placemark.x, y: event.placemark.y}}}>On Map</Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.props.loading === true
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.props.events, this.props.setPosition);

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