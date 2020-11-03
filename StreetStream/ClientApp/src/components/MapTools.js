import React, {Component} from 'react';
import './css/NavMenu.css';

export class MapTools extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="navbar-nav d-flex justify-content-between">
                {this.props.children}
                <li className='mx-1 my-1'>
                    <button className='btn btn-block btn-outline-dark' onClick={() => {
                        this.props.setPosition({x: 53.902284, y: 27.561831})
                    }}>
                        Set position
                    </button>
                </li>
                <li className='mx-1 my-1'>
                    <button className='btn btn-block btn-outline-dark' onClick={() => {
                        this.props.setZoom(this.props.zoom)
                    }}>
                        Toggle map zoom
                    </button>
                </li>
            </ul>
        )
    };
};
