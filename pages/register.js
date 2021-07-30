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

class Register extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.changeFname = ev => this.props.onChangeFname(ev.target.value);
        this.changeLname = ev => this.props.onChangeLname(ev.target.value);
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
		 
		 const { setErrorMessage , router, first_name , last_name , email_id , password } = this.props;
		
		 var formData = {'fisrt_name':first_name,'last_name':last_name,'email_id':email_id,'password':password,'password_confirmation':password};
		 
		 axios
            .post(
               API_URL+'/register',
                formData,
                {headers: {"Content-Type": "application/json"}}
            ).then(function (response) {
                
                if(response.data.Status == 'Success'){
					window.localStorage.setItem('carJwt', response.data.token);
					router.push('/dashboard');
				}
				else{
					setErrorMessage(response.data.Msg);
				}
				
            })
            .catch(function (error) {
                setErrorMessage('Unkonwn Error');
            });
		 
	}
	
    render() {
		
		const { router, first_name , last_name , email_id , password  , registerError } = this.props;
		
		return(
		
			<Layout> 
			
			<h2 >Register</h2>
			
			<form
                acceptCharset="UTF-8"
                method="POST"
                id="ajaxForm"
                onSubmit={this.handleSubmit}
            >
            
				<table>
					<tr>
						<td>First Name</td>
						<td>
							<input
							type="text"
							className="form-control"
							id="first_name"
							placeholder="Enter first name"
							required
							name="first_name"
							value={first_name}
							onChange={this.changeFname}
							/>
						</td>
					</tr>
					<tr>
						<td>Last Name</td>
						<td>
							<input
							type="text"
							className="form-control"
							id="last_name"
							placeholder="Enter last name"
							required
							name="last_name"
							value={last_name}
							onChange={this.changeLname}
							/>
						</td>
					</tr>
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
							{registerError ? (
								<div style={dangerStyle}>
									{registerError}
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
    ...state.register,
    userLoggedIn:state.auth.userLoggedIn
});

const mapDispatchToProps = dispatch => ({
    onChangeFname: value =>
        dispatch({ type: "SET_FIRST_NAME", payload : value }),
    onChangeLname: value =>
        dispatch({ type: "SET_LAST_NAME",  payload : value }),
    onChangeEmail: value =>
        dispatch({ type: "SET_EMAIL", payload : value }),
    onChangePassword: value =>
        dispatch({ type: "SET_PASSWORD",  payload : value }),
    setErrorMessage: value =>
        dispatch({ type: "SET_ERROR",  payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));

