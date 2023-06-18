import React, { useState } from "react";
import './sign-in.styles.scss'
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({ email:'', password:''})     
    const {email, password} = userCredentials;

    const handelSubmit = event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handelChange = event => {
        const { value, name } = event.target;
        setCredentials({...userCredentials, [name]: value})
    } 

        return (
            <div className="sign-in">
                <h2>Already have an accound</h2>
                <span>sign in with your email and password</span>

                <form onClick={handelSubmit}>
                    <FormInput name="email" type="email" value={email} handelChange={handelChange} label='Email' required/>
                    <FormInput name="password" type="password" value={password} handelChange={handelChange} label='Password' required/>
                    <div className="buttons">
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>GOOGLE SIGN IN</CustomButton>
                    </div>
                </form>
            </div>
        )
};


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email ,password) => dispatch(emailSignInStart({email ,password}))
});

export default connect(null, mapDispatchToProps)(SignIn);