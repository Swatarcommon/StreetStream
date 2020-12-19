import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {animated, Spring, useSpring} from "react-spring";
import {SERVER_URL} from "../config.json";
import {Card, CardImg, CardImgOverlay, CardText, CardTitle} from "reactstrap";
import './css/Profile.css';

const EventItem = (props) => {
    const imgUrl = SERVER_URL + '/api/images/' + 'eventStab.jpg';
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
            <Card inverse className="event-card mx-xl-4 my-xl-2" style={{width: 300}}>
                <CardImg width="100%" src={imgUrl} alt="Card image"/>
                <CardImgOverlay>
                    <animated.div
                        style={animPropsText}>
                        <CardTitle style={{color: 'black'}}>{props.event.name}</CardTitle>
                        <CardText style={{color: 'black'}}><span
                            className='font-weight-bold'>Event date</span> {props.event.date}</CardText>
                        <CardText className='my-xl-5'>
                            <Link className="text-light btn btn-dark mx-4"
                                  to={`/?x=${props.event.placemark.x}&y=${props.event.placemark.y}`}>
                                On Map
                            </Link>
                            <Link className="text-light btn btn-dark"
                                  to={`/events/${props.event.id}`}>
                                Details
                            </Link>
                        </CardText>
                    </animated.div>
                </CardImgOverlay>
            </Card>
        </animated.div>
    )
};


export default class CommercialAccount extends Component {

    async componentWillMount() {
        await this.props.fetchCommercialAccount(this.props.commercialAccountId);
    }

    static renderEventsTable(events, role) {
        if (events) {
            events.map(event => event.date = (event.date.split('T'))[0]);
            return (
                <div id='event-list'
                     className='d-flex flex-row-reverse justify-content-xl-end flex-wrap justify-content-center'>
                    {events.map(event =>
                        <EventItem key={event.id} role={role} event={event}/>
                    )}
                </div>
            );
        }
    }

    render() {
        let contents = this.props.loading
            ? <div className='preload'><img src="PreLoad.svg" width="150"
                                            className="d-inline-block align-top" alt="Preload"/></div>
            : CommercialAccount.renderEventsTable(this.props.profileInfo.events, this.props.role);
        const imgUrl = SERVER_URL + '/api/images/' + 'user_stab_2.png';
        console.log(this.props.profileInfo)
        let flag = false;
        if (this.props.profileInfo.subscribers) {
            this.props.profileInfo.subscribers.find(item => item.regularAccountId == this.props.user_id) ? flag = true : flag = false;
        }
        return (
            <div id="profile-container">
                <div className="profile_item profile-info my-5">
                    <div className="profile_item profile-header">
                        <img src={imgUrl} alt="Avatar" className="profile-title profile-avatar"/>
                        <div className='mx-5'>
                            <h1>{this.props.profileInfo.name}</h1>
                            <p><span className='font-weight-bold'>
                                    Email:</span> {this.props.profileInfo.email}
                            </p>
                            <p><span className='font-weight-bold'>
                                    Telephone:</span> {this.props.profileInfo.telephone}
                            </p>
                            <p><span className='font-weight-bold'>
                                    Subscriptions:</span> {this.props.profileInfo.subscribers !== undefined ? this.props.profileInfo.subscribers.length : null}
                            </p>
                            {this.props.isLogged === true && this.props.role === "REGULARACCOUNT" ?
                                <button className=
                                            {flag === true ? 'btn btn-outline-success' : 'btn btn-outline-secondary'}
                                        onClick={() => (flag === true ? this.props.unSubscribe(this.props.profileInfo.id) : this.props.subscribe(this.props.profileInfo.id))}>
                                    {flag === true ? "Subscribed" : "Subscribe"}
                                </button> : null}
                        </div>
                    </div>
                    <br/>
                    <h5>Info:</h5>
                    <div>{this.props.profileInfo.description}</div>
                    <hr/>
                </div>
                <div className="profile_item profile-main">
                    <br/>
                    {contents}
                    <br/><br/><br/><br/>
                </div>
            </div>
        );
    }
}