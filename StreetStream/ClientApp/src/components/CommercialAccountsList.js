import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, CardTitle, CardText, CardImg, CardImgOverlay, NavbarBrand} from 'reactstrap';
import {SERVER_URL} from "../config.json";
import {ToolsMenu} from "./ToolsMenu";
import {useSpring, animated} from 'react-spring'
import './css/EventsList.css';
import {fetchAccounts} from "../store/CommercalAccountsList/actions";

const CommercailAccountItem = (props) => {
    const imgUrl = SERVER_URL + '/api/images/' + 'user_stab_2.png';
    const [animProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 950, mass: 3, tension: 100, friction: 26}
    }));

    const [animPropsText, setAnimText] = useSpring(() => ({
        opacity: 1,
        from: {opacity: 0},
        config: {duration: 1000, mass: 3, tension: 100, friction: 26}
    }));

    return (
        <animated.div
            style={animProps}>
            <Card inverse style={{width: 300}} className='m-2 event-card'>
                <CardImg width="100%" src={imgUrl} alt="Card image"/>
                <CardImgOverlay>
                    <animated.div
                        style={animPropsText}>
                        <CardTitle style={{color:'black'}}>{props.account.name}</CardTitle>
                        <CardText>
                            <Link className="text-light btn btn-dark"
                                  to={`/profile/${props.account.id}`}>
                                Profile
                            </Link>
                        </CardText>
                    </animated.div>
                </CardImgOverlay>
            </Card>
        </animated.div>
    )
};


export default class CommercialAccountsList extends Component {
    componentWillMount() {
        this.loadCommercialAccounts();
    }

    async loadCommercialAccounts() {
        this.props.fetchAccounts();
    }

    static renderAccountsTable(accounts) {
        return (
            <div id='event-list' className='d-flex justify-content-sm-around flex-wrap justify-content-center'>
                {accounts.map(account =>
                    <CommercailAccountItem account={account}/>
                )}
            </div>
        );
    }

    render() {
        let contents = this.props.loading
            ? <div className='preload'><img src="PreLoad.svg" width="150"
                                            className="d-inline-block align-top" alt="Preload"/></div>
            : CommercialAccountsList.renderAccountsTable(this.props.accounts);

        return (
            <div>
                <ToolsMenu/>
                <br/> <br/> <br/>
                {contents}
            </div>
        );
    }
}