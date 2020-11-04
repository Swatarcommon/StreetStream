import React, {Component, useState} from 'react'
import './css/Authorization.css';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import {NavbarBrand} from "reactstrap";

function SignUp(props) {
    const [confirmForm, showConfirmForm] = useState(false);

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = accountInfo => {
        showConfirmForm(true);
        console.log(accountInfo);
        props.sendVerificationCode(accountInfo);
    }

    const onConfirm = userInfo => {
        console.log(userInfo);
        props.signUp(userInfo);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={`${confirmForm ? 'disable' : 'd-flex justify-content-center flex-column'}`}>
                <input type="text" placeholder="Email" name="email"
                       ref={register({required: true, pattern: /^\S+@\S+$/i})}
                       className={'my-2'}/>
                {errors.email && `Email ${errors.email.type === 'pattern' ? 'invalid pattern' : errors.email.type}`}
                <input type="password" placeholder="Password" name="password"
                       ref={register({required: true, minLength: 8})}
                       className='my-2'/>
                {errors.password && `Password ${errors.password.type === 'minLength' ? 'minimum length is 8' : errors.password.type}`}
                <input type="submit" className='btn btn-primary' value='Sign up'/>
                <Link className="text-light  btn-sm btn-link btn text-dark"
                      to={`/`}>
                    back
                </Link>
            </form>
            {confirmForm ?
                <form onSubmit={handleSubmit(onConfirm)} className='d-flex justify-content-center flex-column'>
                    <input type="text" placeholder="Verification code" name="verificationCode"
                           ref={register({required: true})} className='my-2'/>
                    <input type="submit" className='btn btn-primary' value='Confirm'/>
                </form> : <div></div>}
        </div>
    );
}


export default class Authorization extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='d-flex justify-content-center authorization-container align-self-center flex-column'>
                <NavbarBrand tag={Link} to="/" className="text-dark">
                    <img src="default-monochrome.svg" width="250"
                         className="d-inline-block align-top" alt=""/>
                </NavbarBrand>
                <br/>
                <br/>
                {this.props.loading ? "Loading" :
                    <SignUp userInfo={null} loading={this.props.loading} signUp={this.props.signUp}
                            sendVerificationCode={this.props.sendVerificationCode}/>}
            </div>
        )
    }
}
