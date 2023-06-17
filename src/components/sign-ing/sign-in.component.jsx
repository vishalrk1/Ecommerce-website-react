import React from "react";
import './sign-in.styles.scss'
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handelSubmit = event => {
        event.preventDefault();
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;

        emailSignInStart(email, password);
    }

    handelChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    } 

    render() {
        const {googleSignInStart} = this.props;
        return (
            <div className="sign-in">
                <h2>Already have an accound</h2>
                <span>sign in with your email and password</span>

                <form onClick={this.handelSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} handelChange={this.handelChange} label='Email' required/>
                    <FormInput name="password" type="password" value={this.state.password} handelChange={this.handelChange} label='Password' required/>
                    <div className="buttons">
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>GOOGLE SIGN IN</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
};


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email ,password) => dispatch(emailSignInStart({email ,password}))
});

export default connect(null, mapDispatchToProps)(SignIn);