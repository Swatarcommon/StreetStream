import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from 'react-router-dom';
import './css/NavMenu.css';

export class ToolsMenu extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom fixed-top toolbar bar" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/" className="text-dark">
                            <img src="default-monochrome.svg" width="240"
                                 className="d-inline-block align-top" alt=""/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                  navbar>
                            <ul className="navbar-nav flex-grow">
                                {this.props.children}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
