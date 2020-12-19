import React, {Component, useEffect} from 'react';
import {connect} from 'react-redux';
import {Map, Placemark, YMaps, TypeSelector, ZoomControl, GeolocationControl} from "react-yandex-maps";
import {
    openHintMenu,
    fetchPlacemarks,
    setPosition,
    setZoom,
    fetchAddEvent, fetchCategories
} from "../../store/Map/actions";
import '../css/Map.css';
import {ToolsMenu} from "../ToolsMenu";
import {MapTools} from "../MapTools";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

function EventAddForm(props) {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        let coords = window.sessionStorage.getItem('coords_to_add').toString().split(',');
        let categoryevent = [];
        data.CategoryEvent.forEach(id => categoryevent.push({"CategoryId": Number.parseInt(id)}));
        data.placemark = {x: Number.parseFloat(coords[0]), y: Number.parseFloat(coords[1])};
        data.CategoryEvent = categoryevent;
        console.log(data);
        props.fetchAddEvent(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='EventAddForm' style={{background:"white"}}>
            <input type="text" placeholder="Name" name="Name" className='form-control'
                   ref={register({required: true, max: 255, min: 1, maxLength: 255})}/>
            <p className='text-danger'>{errors.Name && `Name ${errors.Name.type === 'pattern' ? 'invalid pattern' : errors.Name.type}`}</p>
            <input type="datepicker" placeholder="Date" name="Date"
                   className='form-control'
                   min={0} required
                   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                   ref={register({required: true})}/>
            <p className='text-danger'>{errors.Date && `Date ${errors.Date.type === 'pattern' ? 'invalid pattern' : errors.Date.type}`}</p>
            <input type="time" placeholder="Duration" name="Duration" ref={register({required: true})} className='form-control'/>
            <p className='text-danger'>{errors.Duration && `Time ${errors.Duration.type === 'pattern' ? 'invalid pattern' : errors.Duration.type}`}</p>
            <textarea name="Description" className='form-control' placeholder='About event'
                      style={{resize: 'none'}}
                      ref={register({required: true, minLength: 1})} className='form-control'/>
            <p className='text-danger'>{errors.Duration && `Description ${errors.Duration.type === 'pattern' ? 'invalid pattern' : errors.Duration.type}`}</p>
            <div className="dropdown">
                <button className="dropbtn">Categories</button>
                <div className="dropdown-content">
                    {props.categroies.map(category => (
                        <label htmlFor="CategoryEvent">{category.name}
                            <input type="checkbox" value={category.id} name="CategoryEvent"
                                   ref={register({required: true})} />
                        </label>
                    ))}
                </div>
            </div>
            <input type="submit"/>
        </form>
    );
}

class MapContainer extends Component {

    componentDidMount() {
        this.loadPlacemarks();
        this.loadTargetPlacemark();
    }
    render() {
        return (
            <YMaps className={"yandex-map"} query={{
                apikey: '29f601fe-7aea-429d-8d58-8c6ed21813b0',
                ns: 'use-load-option',
                load:
                    'control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,control.GeolocationControl',
            }} className={"map-container"}>
                <ToolsMenu>
                </ToolsMenu>
                <Map state={this.props.mapState} className={'interactive-map'}
                     onContextMenu={this.props.role === "COMMERCIALACCOUNT" ? this.props.openHintMenu : null}
                     onClick={(map) => {
                         map.originalEvent.map.hint.close();
                         window.sessionStorage.removeItem('coords_to_add', map.get('coords'));
                         document.getElementById("eventaddformcontainer").classList.add("disable");
                     }}>
                    {this.props.placeMarks.map(placeMark =>
                        <Placemark key={placeMark.x + placeMark.y}
                                   defaultGeometry={[placeMark.x, placeMark.y]}
                                   properties={{
                                       balloonContentBody:
                                           `
                                            <h3>${placeMark.event.name}</h3>\n
                                            <p>${placeMark.event.description}</p>\n
                                            <p><span class="font-weight-bold">Author:</span> ${placeMark.event.commercialAccount.name}</p>
                                            <div>
                                               <a className="text-danger btn btn-dark" href="events/${placeMark.event.id}">
                                                Details
                                                </a>
                                             </div>
                                            `,
                                   }}
                        />
                    )}
                    <div id={"eventaddformcontainer"} className={'disable'}>
                        <EventAddForm
                            categroies={this.props.categories} fetchAddEvent={this.props.fetchAddEvent}/>
                    </div>
                    <TypeSelector options={{float: 'right', position: {top: 100, right: 10}}}/>
                    <ZoomControl options={{float: 'left', position: {bottom: 100, left: 30}}}/>
                    <GeolocationControl options={{float: 'left', position: {bottom: 320, left: 30}}} locationchange={
                        (event) => {
                            var position = event.get('position');
                            console.log("POSITION________", position);
                        }
                    }/>
                </Map>
            </YMaps>
        )
    }

    async loadPlacemarks() {
        this.props.fetchPlacemarks();
        this.props.fetchCategories();
    }

    async loadTargetPlacemark() {
        const targetMarkX = new URLSearchParams(this.props.location.search).get("x");
        const targetMarkY = new URLSearchParams(this.props.location.search).get("y");
        if (targetMarkX !== null && targetMarkY !== null)
            this.props.setPosition({x: targetMarkX, y: targetMarkY});
    }
}

const putStateToProps = (state, ownProps) => {
    console.log("MAP_STATE_LOGGED = ", state.app.isLogged);
    return {
        mapState: {
            center: state.map.center,
            zoom: state.map.zoom
        },
        placeMarks: state.map.placeMarks,
        categories: state.map.categories,
        role: state.app.role
    };
}

const linkActionsToProps = {
    setZoom,
    setPosition,
    fetchPlacemarks,
    fetchAddEvent,
    fetchCategories,
    openHintMenu
}

export default connect(putStateToProps, linkActionsToProps)(MapContainer);

