import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const dangerStyle = {
  color: "red"
};

class Login extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e)
    {
		 e.preventDefault();
		
		 var formData = {'email_id':this.props.email_id,'password':this.props.password};
		 const { setErrorMessage , router} = this.props;
		 
		 axios
            .post(
                API_URL+'/login',
                formData,
                {headers: {Accept: "application/json"}}
            )
            .then(function (response) {
                
                if(response.data.Status == 'Success'){
					window.localStorage.setItem('carJwt', response.data.token);
					router.push('/dashboard');
				}
				else{
					setErrorMessage(response.data.Msg);
				}
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage('Unkonwn Error');
            });
		 
	}
	
    render() {
		
		const email_id = this.props.email_id;
        const password = this.props.password;
        const loginError = this.props.loginError;
        
		return(
		
			<Layout> 
			
			<form
                acceptCharset="UTF-8"
                method="POST"
                id="ajaxForm"
                onSubmit={this.handleSubmit}
            >
                <div className="form-group mb-2">
                    <label >Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email_id"
                        placeholder="Enter email"
                        required
                        name="email_id"
                        value={email_id}
                        onChange={this.changeEmail}
                    />
                </div>
                
                <div className="form-group mb-2">
                    <label >Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        required
                        name="password"
                        value={password}
                        onChange={this.changePassword}
                    />
                </div>
                
                {loginError ? (
                    <div style={dangerStyle}>
                        {loginError}
                    </div>
                ) : (
                    ""
                )}
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
			</Layout>
			
		)
	}
}

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: "SET_EMAIL", payload : value }),
    onChangePassword: value =>
        dispatch({ type: "SET_PASSWORD",  payload : value }),
    setErrorMessage: value =>
        dispatch({ type: "SET_ERROR",  payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

