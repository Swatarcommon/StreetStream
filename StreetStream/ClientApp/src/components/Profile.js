import React, {Component, useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import {animated, Spring, useSpring} from "react-spring";
import {SERVER_URL} from "../config.json";
import {Card, CardImg, CardImgOverlay, CardText, CardTitle} from "reactstrap";
import './css/Profile.css';
import {useForm} from "react-hook-form";
import {fetchUpdateProfile} from "../store/Profile/actions";

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

const SubscriptionItem = (props) => {
    const imgUrl = SERVER_URL + '/api/images/' + 'user_stab_2.png';
    const [animProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 950, mass: 3, tension: 100, friction: 26}
    }));

    const [animPropsText, setAnimText] = useSpring(() => ({
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 1000, mass: 3, tension: 100, friction: 26}
    }));

    return (
        <animated.div
            style={animProps}>
            <Card inverse style={{width: 300}} className='m-2 event-card'>
                <CardImg width="100%" src={imgUrl} alt="Card image"/>
                <CardImgOverlay>
                    <animated.div
                        style={animPropsText}>
                        <CardTitle style={{color: 'black'}}>{props.account.name}</CardTitle>
                        <CardText>
                            <Link className="text-light btn btn-dark"
                                  to={`/profile/${props.account.id}`}>
                                Profile
                            </Link>
                        </CardText>
                    </animated.div>
                </CardImgOverlay>
            </Card>
        </animated.div>
    )
};

const ProfileEditModal = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const [name, setName] = useState(props.profileInfo.name);
    const [password, setPassword] = useState(props.profileInfo.password);
    const [email, setEmail] = useState(props.profileInfo.email);
    const [telephone, setTelephone] = useState(props.profileInfo.telephone);
    const [description, setDescription] = useState(props.profileInfo.description);

    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        if (name === undefined)
            setName(props.profileInfo.name);
        if (password === undefined)
            setPassword(props.profileInfo.password);
        if (email === undefined)
            setEmail(props.profileInfo.email);
        if (telephone === undefined)
            setTelephone(props.profileInfo.telephone);
        if (description === undefined)
            setDescription(props.profileInfo.description);
    });

    const onSubmit = data => {
        console.log(data);
        data.role = props.role;
        props.fetchUpdateProfile(data);
    };
    return (
        <>
            {props.modalIsOpen &&
            <div className='modalOverlay'>
                <div className='modalWindow'>
                    <div className='modalHeader'>
                        <div className='modalTitle'>Update profile</div>
                        <button className='times btn' onClick={props.closeModal}>
                            X
                        </button>
                    </div>
                    <div className='modalBody'>
                        <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
                            <input type="text" className="input form-control" placeholder="Name" name="name" ref={register({
                                required: true,
                                min: 2,
                                maxLength: 80,
                                // pattern: /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i
                                pattern: /^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$/i
                            })} value={name} onChange={(e => {
                                setName(e.target.value);
                            })}/>
                            <p className='text-danger'>{errors.name && `Name ${errors.name.type === 'pattern' ? 'invalid pattern' : errors.name.type}`}</p>
                            <input type="text" className="input form-control" placeholder="Email" name="email"
                                   ref={register({required: true, pattern: /^\S+@\S+$/i})} title='tooltip' value={email}
                                   onChange={(e => {
                                       setEmail(e.target.value);
                                   })}/>
                            <p className='text-danger'>{errors.email && `Email ${errors.email.type === 'pattern' ? 'invalid pattern' : errors.email.type}`}</p>
                            <input type="password" className="input form-control" placeholder="Password" name="password"
                                   ref={register({required: true, minLength: 8})} value={password} onChange={(e => {
                                setPassword(e.target.value);
                            })}/>
                            <p className='text-danger'>{errors.password && `Password ${errors.password.type === 'minLength' ? 'minimum length is 8' : errors.password.type}`}</p>
                            {props.role === "COMMERCIALACCOUNT" ?
                                <input type="text" className="input form-control" placeholder="Telephone" name="telephone"
                                       ref={register({
                                           required: true,
                                           minLength: 4, maxLength: 12,
                                           pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i
                                       })} value={telephone} onChange={(e => {
                                    setTelephone(e.target.value);
                                })}/> : null}
                            <p className='text-danger'>{errors.telephone && `Telephone ${errors.telephone.type === 'minLength' ? 'minimum length is 8' : errors.telephone.type}`}</p>
                            {props.role === "COMMERCIALACCOUNT" ?
                                <textarea name="description" className='form-control' placeholder='About you'
                                          style={{resize: 'none'}}
                                          ref={register({required: true, minLength: 1})} value={description}
                                          onChange={(e => {
                                              setDescription(e.target.value);
                                          })}/> : null}
                            <p className='text-danger'>{errors.description && `Description ${errors.description.type === 'pattern' ? 'invalid pattern' : errors.description.type}`}</p>
                            <input type='hidden'
                                   value={props.profileInfo.id} ref={register({required: true})} name='id'/>
                            <input type="submit" value="Update" className='btn btn-outline-success'/>
                        </form>
                    </div>
                    <div className='modalFooter'>
                        <button className='times btn btn-danger' value={props.role} onClick={(e) => {
                            props.fetchDeleteProfile(e.target.value);
                        }}>
                            Delete
                        </button>
                        <button className='times btn' onClick={props.closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            }
        </>)
}

export default class Profile extends Component {

    async componentWillMount() {
        await this.props.fetchProfile();
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

    static renderSubscriptionsTable(subscriptions, role) {
        if (subscriptions) {
            return (
                <div id='event-list'
                     className='d-flex flex-row-reverse justify-content-xl-end flex-wrap justify-content-center'>
                    {subscriptions.map(subscription =>
                        <SubscriptionItem key={subscription.commercialAccountId} role={role}
                                          account={subscription.commercialAccount}/>
                    )}
                </div>
            );
        }
    }

    render() {
        if (!this.props.isLogged) {
            return (<Redirect to={'/'}/>)
        } else {
            let contents;
            let imgUrl;
            if (this.props.role === "COMMERCIALACCOUNT") {
                imgUrl = SERVER_URL + '/api/images/' + 'user_stab_2.png';
                contents = this.props.loading
                    ? <div className='preload'><img src="PreLoad.svg" width="150"
                                                    className="d-inline-block align-top" alt="Preload"/></div>
                    : Profile.renderEventsTable(this.props.profileInfo.events, this.props.role);
            }
            if (this.props.role === "REGULARACCOUNT") {
                imgUrl = SERVER_URL + '/api/images/' + 'regularAccountStab.jpg';
                contents = this.props.loading
                    ? <div className='preload'><img src="PreLoad.svg" width="150"
                                                    className="d-inline-block align-top" alt="Preload"/></div>
                    : Profile.renderSubscriptionsTable(this.props.profileInfo.subscriptions, this.props.role);
            }
            return (
                <div id="profile-container">
                    <ProfileEditModal profileInfo={this.props.profileInfo}
                                      role={this.props.role}
                                      modalIsOpen={this.props.modalIsOpen}
                                      closeModal={this.props.closeModal}
                                      fetchUpdateProfile={this.props.fetchUpdateProfile}
                                      fetchDeleteProfile={this.props.fetchDeleteProfile}/>
                    <div className="profile_item profile-info my-5">
                        <div className="profile_item profile-header">
                            <img src={imgUrl} alt="Avatar" className="profile-title profile-avatar"/>
                            <div className='mx-5'>
                                <h1>{this.props.profileInfo.name}</h1>
                                <p><span className='font-weight-bold'>
                You email:</span> {this.props.profileInfo.email}
                                </p>
                                <input type="button" className="btn btn-secondary text-dark"
                                       style={{background: "white"}}
                                       value='Edit' onClick={this.props.openModal}/>
                                <button className='btn btn-outline-danger mx-2' onClick={this.props.logOut}>
                                    Log out
                                </button>
                            </div>
                        </div>
                        <br/>
                        {this.props.role === "COMMERCIALACCOUNT" ? <>
                            <h5>Info:</h5>
                            <div>{this.props.profileInfo.description !== undefined ? this.props.profileInfo.description : null}</div>
                        </> : null}
                        <hr/>
                    </div>
                    <div className="profile_item profile-main">
                        <br/>
                        {contents}
                        <br/><br/><br/><br/>
                    </div>
                    {this.props.role === "REGULARACCOUNT" ?
                        <div className="profile_item profile-upcoming-events">
                            <h5>Upcoming events</h5>
                            {this.props.profileInfo.upcommingEvents !== undefined ? this.props.profileInfo.upcommingEvents.map(event => (
                                <Link className="text-light page-link"
                                      to={`/events/${event.id}`}>
                                    <div style={{color: "black"}}>{event.name} / {event.date} / {event.duration}</div>
                                </Link>
                            )) : null}
                        </div>
                        : null}
                </div>
            );
        }
    }
}