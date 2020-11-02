import {animated, useSpring} from "react-spring";
import MapContainer from "./containers/MapContainer";
import React from "react";

export default function Map(props) {
    const {opacity, x} = useSpring({opacity: 1, x: 200, from: {opacity: 0.5, x: 0}, config: {duration: 2500}});
    console.log('props from fetchdata', props.location.sss);
    return <animated.div style={{
        opacity,
        background: x.interpolate(x => `rgba(210, 57, ${x ^ 3}, ${x})`)
    }}>
        <MapContainer targetPlacemark={props.location.targetPlacemark} className={"home-component"}/>
    </animated.div>
}