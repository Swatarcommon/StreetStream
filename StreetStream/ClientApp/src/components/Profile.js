import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {animated, Spring, useSpring} from "react-spring";
import {SERVER_URL} from "../config.json";
import {Card, CardImg, CardImgOverlay, CardText, CardTitle} from "reactstrap";
import './css/Profile.css';

const EventItem = (props) => {
    const imgUrl = SERVER_URL + '/api/images/' + '1.jpg';
    const [animProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 1,
        from: {opacity: 0.6},
        config: {duration: 950, mass: 3, tension: 100, friction: 26}
    }));

    const [animPropsText, setAnimText] = useSpring(() => ({
        opacity: 1,
        from: {opacity: 0.6},
        config: {duration: 1000, mass: 3, tension: 100, friction: 26}
    }));

    return (
        <animated.div
            style={animProps}>
            <Card inverse className="event-card" style={{width: 300}}>
                <CardImg width="100%" src={imgUrl} alt="Card image"/>
                <CardImgOverlay>
                    <animated.div
                        style={animPropsText}>
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
                            {props.role === "COMMERCIALACCOUNT" ?
                                <Link className="text-light btn btn-dark"
                                      to={`/events/${props.event.id}`}>
                                    Change
                                </Link> : null
                            }
                        </CardText>
                    </animated.div>
                </CardImgOverlay>
            </Card>
        </animated.div>
    )
};


export default class Profile extends Component {
    componentWillMount() {
        this.props.isLogginCheck();
        this.loadEvents();
    }

    async loadEvents() {
        this.props.fetchProfile();
    }

    static renderEventsTable(events) {
        if (events) {
            return (
                <div id='event-list' className='d-flex justify-content-sm-around flex-wrap justify-content-center'>
                    {events.map(event =>
                        <EventItem event={event}/>
                    )}
                </div>
            );
        }
    }

    render() {
        if (!this.props.isLogged) {
            return (<Redirect to={'/'}/>)
        } else {
            let contents = this.props.loading
                ? <div className='preload'><img src="PreLoad.svg" width="150"
                                                className="d-inline-block align-top" alt="Preload"/></div>
                : Profile.renderEventsTable(this.props.profileInfo.events);

            return (
                <div id="profile-container">
                    <div className="profile_item profile-info">
                        <h1>{this.props.profileInfo.email}</h1>
                    </div>
                    <div className="profile_item profile-main">
                        {contents}
                        <button onClick={this.props.logOut}>Log out</button>
                    </div>
                </div>
            );
        }
    }
}