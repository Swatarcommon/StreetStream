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


    const onSubmit = async (accountInfo) => {
        console.log("ACCOUNT INFO", accountInfo);
        props.logIn(accountInfo);
    }

    const SignUpBtnClick = e => {
        let parent = e.target.parentNode.parentNode;
        console.log(parent);
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                const loginBtn = document.getElementById('login');
                loginBtn.parentNode.parentNode.classList.add('slide-up');
                parent.classList.remove('slide-up');
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={`${confirmForm ? 'disable' : 'd-flex justify-content-center flex-column'}`}>
                <div className="signup">
                    <h2 className="form-title" id="signup"><span>or</span><p id='signUpTitle'
                                                                             onClick={SignUpBtnClick}>Log In</p>
                        <NavbarBrand tag={Link} to="/" className="text-dark brand-in-auth">
                            <img src="default-monochrome-white.svg" width="250"
                                 className="d-inline-block align-top" alt=""/>
                        </NavbarBrand></h2>
                    <div className="form-holder">
                        <input type="text" className="input" placeholder="Email" name="email"
                               ref={register({required: true, pattern: /^\S+@\S+$/i})}/>
                        <input type="password" className="input" placeholder="Password" name="password"
                               ref={register({required: true, minLength: 8})}/>
                    </div>
                    <input type="submit" className="submit-btn btn-light text-dark" id='singInBtn'
                           style={{background: "white"}} value='Log In'/>
                    <p className='text-danger'>{errors.email && `Email ${errors.email.type === 'pattern' ? 'invalid pattern' : errors.email.type}`}</p>
                    <p className='text-danger'>{errors.password && `Password ${errors.password.type === 'minLength' ? 'minimum length is 8' : errors.password.type}`}</p>
                    <Link className="text-light  btn-sm font-weight-normal btn "
                          to={`/`}>
                        Back to home
                    </Link>
                </div>
            </form>
        </div>
    );
}

function SignIn(props) {
    const [confirmForm, showConfirmForm] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const recaptchaRef = React.useRef(ReCAPTCHA);

    const onSubmit = async (accountInfo) => {
        const token = await recaptchaRef.current.executeAsync();
        console.log("ACCOUNT INFO", accountInfo);
        console.log("TOKEN", token);
        recaptchaRef.current.reset();
        props.signUp(accountInfo, token);
    }

    const LogInBtnClick = e => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                const signupBtn = document.getElementById('signup');
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={`${confirmForm ? 'disable' : 'd-flex justify-content-center flex-column'}`}>
                <div className="login slide-up">
                    <div className="center">
                        <h2 className="form-title" id="login" onClick={LogInBtnClick}><span>or</span>Sing Up</h2>
                        <div className="form-holder">
                            <input type="text" className="input" placeholder="Email" name="email"
                                   ref={register({required: true, pattern: /^\S+@\S+$/i})}/>
                            <input type="password" className="input" placeholder="Password" name="password"
                                   ref={register({required: true, minLength: 8})}/>
                        </div>
                        <input type="submit" className="submit-btn btn-light text-light" id='singUpBtn'
                               style={{background: "black"}} value='Sign Up'/>
                        <p className='text-danger'>{errors.email && `Email ${errors.email.type === 'pattern' ? 'invalid pattern' : errors.email.type}`}</p>
                        <p className='text-danger'>{errors.password && `Password ${errors.password.type === 'minLength' ? 'minimum length is 8' : errors.password.type}`}</p>
                        <Link className="text-light  btn-sm font-weight-normal btn text-dark"
                              to={`/`}>
                            Back to home
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default class Authorization extends Component {
    render() {
        if (this.props.isLogged) {
            return (<Redirect to={'/'}/>)
        } else {
            return (
                <div className='bgDivImage'>
                    <Spring from={{opacity: 0}}
                            to={{opacity: 1}}
                            config={{duration: 1000}}
                    >
                        {props =>
                            (<animated.div style={props}
                                           className='d-flex justify-content-center authorization-container align-self-center flex-column'>
                                <div className="form-structor">
                                    <h6 className='text-danger text-center'>{this.props.errorMsg}</h6>
                                    <SignUp logIn={this.props.logIn} errors={this.props.error}/>
                                    <SignIn errors={this.props.error} loading={this.props.loading}
                                            signUp={this.props.signUp}
                                            sendVerificationCode={this.props.sendVerificationCode}/>
                                </div>
                            </animated.div>)
                        }
                    </Spring>
                </div>
            )
        }
    }
}
