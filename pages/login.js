import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import axios from 'axios';

const dangerStyle = {
  color: "red"
};

if (typeof window === 'undefined') {
    global.window = {};
}

class Login extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
		
		var userLoggedIn = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		if(userLoggedIn){
			this.props.router.push('/dashboard');
		}
	}
	
    handleSubmit(e)
    {
		 e.preventDefault();
		 
		 const { setErrorMessage , router, email_id , password } = this.props;
		
		 var formData = {'email_id':email_id,'password':password};
		 
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
		
		const { router, email_id , password , loginError } = this.props;
		
		return(
		
			<Layout> 
			
			<h2 >Login</h2>
			
			<form
                acceptCharset="UTF-8"
                method="POST"
                id="ajaxForm"
                onSubmit={this.handleSubmit}
            >
            
				<table>
					<tr>
						<td>Email</td>
						<td>
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
						</td>
					</tr>
					<tr>
						<td>Password</td>
						<td>
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
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
							{loginError ? (
								<div style={dangerStyle}>
									{loginError}
								</div>
							) : (
								""
							)}
						</td>
					</tr>
					<tr>
						<td>
						</td>
						<td>
							<button type="submit" className="btn btn-primary">Submit</button>
						</td>
					</tr>
				</table>
				   
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

