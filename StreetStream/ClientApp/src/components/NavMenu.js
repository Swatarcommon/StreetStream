import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import './css/NavMenu.css';
import {Route} from "react-router";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

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
        if (this.props.isLogged) {
            return (
                <footer>
                    <Navbar className="navbar-expand-md navbar-toggleable-sm border-bottom fixed-bottom navbar bar"
                            light>
                        <Container>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                            <Collapse className="d-lg-block-flex flex-lg-fill justify-content-center"
                                      isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Map</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/events">Events</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/accountslist">Commercial
                                            Accounts</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </footer>
            );
        } else {
            return (
                <footer>
                    <Navbar className="navbar-expand-md navbar-toggleable-sm border-bottom fixed-bottom navbar bar"
                            light>
                        <Container>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                            <Collapse className="d-lg-block-flex flex-lg-fill justify-content-center"
                                      isOpen={!this.state.collapsed} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Map</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/events">Events</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/accountslist">Commercial
                                            Accounts</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark"
                                                 to="/authorization">Authorization</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </footer>
            );
        }
    }
}
