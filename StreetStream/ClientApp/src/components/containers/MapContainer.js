import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {setZoom} from "../../store/actions";
import {setPosition} from "../../store/Map/actions";


class MapContainer extends Component {
    render() {
        return (
            <YMaps query={{
                ns: 'use-load-option',
                load:
                    'control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon',
            }}>
                <Map state={this.props.mapState}>
                    {this.props.placeMarks.map(placeMark =>
                        <Placemark
                            defaultGeometry={[placeMark.x, placeMark.y]}
                            properties={{
                                balloonContentBody:
                                    `This is balloon coordinate is [${placeMark.x},${placeMark.y}]`,
                            }}
                        />
                    )};
                </Map>
                <br/>
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
            </YMaps>
        )
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
    setPosition
}

export default connect(putStateToProps, linkActionsToProps)(MapContainer);

