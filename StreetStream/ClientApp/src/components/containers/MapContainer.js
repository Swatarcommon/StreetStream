import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {fetchPlacemarks, setPosition, setZoom} from "../../store/Map/actions";
import '../css/Map.css';

class MapContainer extends Component {

    componentWillMount() {
        this.loadPlacemarks();
    }

    render() {
        return (
            <YMaps className={"yandex-map"} query={{
                ns: 'use-load-option',
                load:
                    'control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
            }}>
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
                <br/>
                <div className={'map-control-panel'}>
                    <button onClick={() => {
                        this.props.setZoom(this.props.mapState.zoom)
                    }}>
                        Toggle map zoom
                    </button>
                    <button onClick={() => {
                        this.props.setPosition()
                    }}>
                        Set position
                    </button>
                </div>
            </YMaps>
        )
    }

    async loadPlacemarks() {
        this.props.fetchPlacemarks();
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

