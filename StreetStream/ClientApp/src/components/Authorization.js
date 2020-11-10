import React, {Component, useState} from 'react'
import './css/Authorization.css';
import {useForm} from 'react-hook-form';
import {Link, Redirect} from "react-router-dom";
import {NavbarBrand} from "reactstrap";
import {Spring, animated} from "react-spring";
import ReCAPTCHA from 'react-google-recaptcha';

function SignUp(props) {
    const [confirmForm, showConfirmForm] = useState(false);
    const {register, handleSubmit, errors} = useForm();

    const recaptchaRef = React.useRef(ReCAPTCHA);

    const onSubmit = async (accountInfo) => {
        const token = await recaptchaRef.current.executeAsync();
        console.log("ACCOUNT INFO",accountInfo);
        console.log("TOKEN",token);
        recaptchaRef.current.reset();
        props.signUp(accountInfo,token);
        // apply to form data
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={`${confirmForm ? 'disable' : 'd-flex justify-content-center flex-column'}`}>
                <input type="text" placeholder="Email" name="email"
                       ref={register({required: true, pattern: /^\S+@\S+$/i})}
                       className={''}/>
                <p className='text-warning'>{errors.email && `Email ${errors.email.type === 'pattern' ? 'invalid pattern' : errors.email.type}`}</p>
                <input type="password" placeholder="Password" name="password"
                       ref={register({required: true, minLength: 8})}
                       className='mt-3'/>
                <p className='text-warning'>{errors.password && `Password ${errors.password.type === 'minLength' ? 'minimum length is 8' : errors.password.type}`}</p>
                <input type="submit" className='btn btn-primary mt-3' value='Sign up'/>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey="6Ld5UuEZAAAAAL4G2aqRuw5zlfjBb5k4kc7dbHgJ"
                />
                <Link className="text-light  btn-sm btn-link btn text-dark"
                      to={`/`}>
                    back
                </Link>
            </form>
        </div>
    );
}


export default class Authorization extends Component {
    render() {
        if (this.props.logged) {
            return (<Redirect to={'/'}/>)
        } else {
            return (
                <Spring from={{opacity: 0}}
                        to={{opacity: 1}}
                        config={{duration: 1000}}
                >
                    {props =>
                        (<animated.div style={props}
                                       className='d-flex justify-content-center authorization-container align-self-center flex-column'>
                            <NavbarBrand tag={Link} to="/" className="text-dark">
                                <img src="default-monochrome.svg" width="250"
                                     className="d-inline-block align-top" alt=""/>
                            </NavbarBrand>
                            <br/>
                            <h6 className='text-danger text-center'>{this.props.errorMsg}</h6>
                            {this.props.loading ? "Loading" :
                                <SignUp errors={this.props.error} loading={this.props.loading}
                                        signUp={this.props.signUp}
                                        sendVerificationCode={this.props.sendVerificationCode}/>}
                        </animated.div>)
                    }
                </Spring>
            )
        }
    }
}
