import React, {Component} from 'react';
import MapContainer from "./containers/MapContainer";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <MapContainer/>
            </div>
        );
    }
}
