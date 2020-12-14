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
        <form onSubmit={handleSubmit(onSubmit)} className='EventAddForm'>
            <input type="text" placeholder="Name" name="Name"
                   ref={register({required: true, max: 255, min: 1, maxLength: 255})}/>
            <input type="datepicker" placeholder="Date" name="Date"
                   min={0} required
                   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                   ref={register({required: true})}/>
            <input type="time" placeholder="Duration" name="Duration" ref={register({required: true})}/>
            <div className="dropdown">
                <button className="dropbtn">Categories</button>
                <div className="dropdown-content">
                    {props.categroies.map(category => (
                        <label htmlFor="CategoryEvent">{category.name}
                            <input type="checkbox" value={category.id} name="CategoryEvent"
                                   ref={register({required: true})}/>
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
// // Adding the control with a custom geolocation placemark on the map.
//     geolocationControl.events.add('locationchange', function (event) {
//         var position = event.get('position');
//         // When creating a placemark, you can set any appearance for it.
//         var locationPlacemark = new ymaps.Placemark(position);
//
//         myMap.geoObjects.add(locationPlacemark);
//         // Setting the new map center to the user's current location.
//         myMap.panTo(position);
//     });
//     myMap.controls.add(geolocationControl);
    render() {
        return (
            <YMaps className={"yandex-map"} query={{
                apikey:'29f601fe-7aea-429d-8d58-8c6ed21813b0',
                ns: 'use-load-option',
                load:
                    'control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,control.GeolocationControl',
            }} className={"map-container"}>
                <ToolsMenu>
                    <MapTools setPosition={this.props.setPosition} setZoom={this.props.setZoom}
                              zoom={this.props.mapState.zoom}/>
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
                                           `This is balloon coordinate is [${placeMark.x},${placeMark.y}]`,
                                   }}
                        />
                    )}
                    <div id={"eventaddformcontainer"} className={'disable'}><EventAddForm
                        categroies={this.props.categories} fetchAddEvent={this.props.fetchAddEvent}/></div>
                    <TypeSelector options={{float: 'right', position: {top: 100, right: 10}}}/>
                    <ZoomControl options={{float: 'left', position: {bottom: 100, left: 30}}}/>
                    <GeolocationControl options={{float: 'left', position: {bottom: 320, left: 30}}} locationchange={
                        (event)=>{
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

