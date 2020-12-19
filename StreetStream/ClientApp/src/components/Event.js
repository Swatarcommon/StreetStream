import React, {Component, useState, useEffect} from 'react';
import {SERVER_URL} from "../config.json";
import {ToolsMenu} from "./ToolsMenu";
import {Link} from "react-router-dom";
import './css/Event.css';
import {useForm} from "react-hook-form";
import {fetchCategories} from "../store/Map/actions";
import {CardText} from "reactstrap";

const EventEditModal = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const [name, setName] = useState(props.event.name);
    const [date, setDate] = useState(props.event.date);
    const [duration, setDuration] = useState(props.event.duration);
    const [description, setDescription] = useState(props.event.description);
    const [categories, setCategories] = useState(props.categoryEvent);

    useEffect(() => {
        // Обновляем заголовок документа с помощью API браузера
        if (name === undefined)
            setName(props.event.name);
        if (date === undefined)
            setDate(props.event.date);
        if (duration === undefined)
            setDuration(props.event.duration);
        if (description === undefined)
            setDescription(props.event.description);
        if (description === undefined)
            setCategories(props.categoryEvent);
    });

    const onSubmit = data => {
        let categoryevent = [];
        data.CategoryEvent.forEach(id => categoryevent.push({"CategoryId": Number.parseInt(id)}));
        data.CategoryEvent = categoryevent;
        data.placemark = JSON.parse(data.placemark);
        console.log(data);
        props.fetchUpdateEvent(data);
    };
    return (
        <>
            {props.modalIsOpen &&
            <div className='modalOverlay'>
                <div className='modalWindow'>
                    <div className='modalHeader'>
                        <div className='modalTitle'>Update event</div>
                        <button className='times btn' onClick={props.closeModal}>
                            X
                        </button>
                    </div>
                    <div className='modalBody'>
                        <form onSubmit={handleSubmit(onSubmit)} className='EventAddForm'>
                            <input type="text" placeholder="Name" className='form-control' name="Name"
                                   ref={register({required: true, max: 255, min: 1, maxLength: 255})}
                                   value={name} onChange={(event => {
                                setName(event.target.value);
                            })}/>
                            <p className='text-danger'>{errors.Name && `Name ${errors.Name.type === 'pattern' ? 'invalid pattern' : errors.Name.type}`}</p>
                            <input type="datepicker" className='form-control' placeholder="Date" name="Date"
                                   min={0} required
                                   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                                   ref={register({required: true})} value={date}
                                   onChange={(event => {
                                       setDate(event.target.value);
                                   })}/>
                            <p className='text-danger'>{errors.Date && `Date ${errors.Date.type === 'pattern' ? 'invalid pattern' : errors.Date.type}`}</p>
                            <input type="time" placeholder="Duration" className='form-control' name="Duration" ref={register({required: true})}
                                   value={duration}
                                   onChange={(event => {
                                       setDuration(event.target.value);
                                   })}/>
                            <p className='text-danger'>{errors.Duration && `Duration ${errors.Duration.type === 'pattern' ? 'invalid pattern' : errors.Duration.type}`}</p>
                            <textarea name="Description" className='form-control' placeholder='About event'
                                      style={{resize: 'none'}}
                                      ref={register({required: true, minLength: 1})} value={description}
                                      onChange={(event => {
                                          setDescription(event.target.value);
                                      })}/>
                            <p className='text-danger'>{errors.Description && `Description ${errors.Description.type === 'pattern' ? 'invalid pattern' : errors.Description.type}`}</p>
                            <div className="dropdown">
                                <button className="dropbtn">Categories</button>
                                <div className="dropdown-content">
                                    {
                                        props.categories.map(category => (
                                            categories.some(categoryItem => (categoryItem.category.id === category.id)) === true
                                                ?
                                                <label htmlFor="CategoryEvent">{category.name}
                                                    <input type="checkbox"
                                                           checked='checked'
                                                           value={category.id} name="CategoryEvent"
                                                           ref={register({required: true})}/>
                                                </label>
                                                :
                                                <label htmlFor="CategoryEvent">{category.name} <input type="checkbox"
                                                                                                      value={category.id}
                                                                                                      name="CategoryEvent"
                                                                                                      ref={register({required: true})}/>
                                                </label>
                                        ))
                                    }
                                </div>
                            </div>
                            <input type='hidden'
                                   value={props.event.id} ref={register({required: true})} name='id'/>
                            <input type='hidden'
                                   value={props.event.placemark === undefined ? null : JSON.stringify(props.event.placemark)}
                                   ref={register({required: true})} name='placemark'/>
                            <input type="submit" value="Update" className='btn btn-outline-success'/>
                        </form>
                    </div>
                    <div className='modalFooter'>
                        <button className='times btn btn-danger' value={props.event.id} onClick={(e) => {
                            props.fetchDeleteEvent(e.target.value)
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

export default class EventDetails extends Component {
    componentWillMount() {
        this.fetchEventInfo();
    }

    async fetchEventInfo() {
        this.props.fetchEventById(this.props.eventId);
        this.props.fetchCategories();
    }

    static renderEvent(props) {
        const imgUrl = SERVER_URL + '/api/images/' + 'eventStab.jpg';
        console.log("ROLE    ", props.role)
        return (
            <div className='d-flex justify-content-lg-start flex-row'>
                <div className='d-flex flex-row'>
                    <div className='px-xl-5 d-flex flex-column'>
                        <img src={imgUrl} width={300}/>
                        <Link className="text-light btn btn-dark my-lg-4 "
                              to={`/?x=${props.placemark.x}&y=${props.placemark.y}`}>
                            On Map
                        </Link>
                        {
                            props.commercialAccount.id !== Number.parseInt(props.user_id) || props.role !== "COMMERCIALACCOUNT" ? null :
                                <input type="button" className="btn btn-light text-dark mx-4"
                                       style={{background: "white"}}
                                       value='Edit' onClick={props.openModal}/>
                        }
                    </div>
                    <div className='px-xl-5'>
                        <h2>{props.event.name}</h2>
                        <p><span className='font-italic font-weight-bolder'>Duration:</span> {props.event.duration}</p>
                        <p><span className='font-italic font-weight-bolder'>Date:</span> {props.event.date}</p>
                        <p><span
                            className='font-italic font-weight-bolder'>Author:</span> <Link className="text-dark"
                                                                                            to={`/profile/${props.commercialAccount.id}`}>
                            {props.commercialAccount.name}
                        </Link></p>
                        <div className='d-flex flex-column py-xl-5'>
                            <h3>Categories</h3>
                            <p className='d-flex flex-row' word-spacing="50px">{props.categoryEvent.map(
                                categoryEvent => (<p className='px-3'>{categoryEvent.category.name}</p>)
                            )}</p>
                            <br/><br/><br/>
                            <div>
                                <hr/>
                                {props.event.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.props.loading
            ? <div className='preload'><img src="PreLoad.svg" width="150"
                                            className="d-inline-block align-top" alt="Preload"/></div>
            : EventDetails.renderEvent(this.props);

        return (
            <div>
                <ToolsMenu/>
                {this.props.categories !== undefined ? <EventEditModal event={this.props.event}
                                                                       categories={this.props.categories}
                                                                       categoryEvent={this.props.categoryEvent}
                                                                       modalIsOpen={this.props.modalIsOpen}
                                                                       closeModal={this.props.closeModal}
                                                                       fetchUpdateEvent={this.props.fetchUpdateEvent}
                                                                       fetchCategories={this.props.fetchCategories}
                                                                       fetchDeleteEvent={this.props.fetchDeleteEvent}/> : null}
                <br/><br/><br/><br/>
                {contents}
            </div>
        )
    };
}
