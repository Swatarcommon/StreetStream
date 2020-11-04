import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, CardTitle, CardText, CardImg, CardImgOverlay, NavbarBrand} from 'reactstrap';
import {SERVER_URL} from "../config.json";
import {ToolsMenu} from "./ToolsMenu";
import {useSpring, animated} from 'react-spring'
import './css/EventsList.css';

const EventItem = (props) => {
    const imgUrl = SERVER_URL + '/api/images/' + '1.jpg';
    const [animProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 1200, mass: 3, tension: 100, friction: 26}
    }));
    return (
        <animated.div
            style={animProps}>
            <Card inverse style={{width: 300}} className='m-2 event-card'>
                <CardImg width="100%" src={imgUrl} alt="Card image"/>
                <CardImgOverlay>
                    <CardTitle>{props.event.name}</CardTitle>
                    <CardText>Event date {props.event.date}</CardText>
                    <CardText>
                        <Link className="text-light btn btn-dark"
                              to={`/?x=${props.event.placemark.x}&y=${props.event.placemark.y}`}>
                            On Map
                        </Link>
                        <Link className="text-light btn btn-dark"
                              to={`/events/${props.event.id}`}>
                            Details
                        </Link>
                    </CardText>
                </CardImgOverlay>
            </Card>
        </animated.div>
    )
};


export default class EventsList extends Component {
    componentWillMount() {
        this.loadEvents();
    }

    static renderForecastsTable(events) {
        return (
            <div className='d-flex justify-content-sm-around flex-wrap justify-content-center'>
                {events.map(event =>
                    <EventItem event={event}/>
                )}
            </div>
        );
    }

    render() {
        let contents = this.props.loading
            ? <div className='preload'><img src="PreLoad.svg" width="150"
                        className="d-inline-block align-top" alt="Preload"/></div>
            : EventsList.renderForecastsTable(this.props.events);

        return (
            <div>
                <ToolsMenu/>
                <br/> <br/> <br/>
                {contents}
            </div>
        );
    }

    async loadEvents() {
        this.props.fetchEvents();
    }
}