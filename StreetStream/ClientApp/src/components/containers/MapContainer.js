import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {fetchPlacemarks, setPosition, setZoom} from "../../store/Map/actions";
import '../css/Map.css';
import {ToolsMenu} from "../ToolsMenu";
import {MapTools} from "../MapTools";

class MapContainer extends Component {

    componentDidMount() {
        this.loadPlacemarks();
        this.loadTargetPlacemark();
    }

    render() {
        return (
            <YMaps className={"yandex-map"} query={{
                ns: 'use-load-option',
                load:
                    'control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
            }} className={"map-container"}>
                <ToolsMenu>
                    <MapTools setPosition={this.props.setPosition} setZoom={this.props.setZoom}
                              zoom={this.props.mapState.zoom}/>
                </ToolsMenu>
                <Map state={this.props.mapState} className={'interactive-map'}>
                    {this.props.placeMarks.map(placeMark =>
                        <Placemark
                            defaultGeometry={[placeMark.x, placeMark.y]}
                            properties={{
                                balloonContentBody:
                                    `This is balloon coordinate is [${placeMark.x},${placeMark.y}]`,
                            }}
                        />
                    )}
                </Map>
            </YMaps>
        )
    }

    async loadPlacemarks() {
        this.props.fetchPlacemarks();
    }

    async loadTargetPlacemark() {
        const targetMarkX = new URLSearchParams(this.props.location.search).get("x");
        const targetMarkY = new URLSearchParams(this.props.location.search).get("y");
        if (targetMarkX !== null && targetMarkY !== null)
            this.props.setPosition({x: targetMarkX, y: targetMarkY});
    }
}

const putStateToProps = (state, ownProps) => {
    console.log(state.map.placeMarks);
    return {
        mapState: {
            center: state.map.center,
            zoom: state.map.zoom
        },
        placeMarks: state.map.placeMarks
    };
}

const linkActionsToProps = {
    setZoom,
    setPosition,
    fetchPlacemarks
}

export default connect(putStateToProps, linkActionsToProps)(MapContainer);

