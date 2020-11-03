import React, {Component} from 'react';
import {NavMenu} from './NavMenu';
import {ToolsMenu} from "./ToolsMenu";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <div className='main-container'>
                    {this.props.children}
                </div>
                <NavMenu/>
            </div>
        );
    }
}
