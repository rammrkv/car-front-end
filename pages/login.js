/*import Layout from '../layout/layout'

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config'


class Login extends React.Component {
	
	constructor(props) {
        
        super(props);
        
        //this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        //this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    }
    
    render() {
		
		//const email_id = this.props.email_id;
        //const password = this.props.password;
        
       // const { register, handleSubmit, errors } = this.props;
		
		return(
		
			<Layout>
			AAAAA
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
        dispatch({ type: "SET_PASSWORD",  payload : value })
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));*/

import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import { useForm } from 'react-hook-form';

class Login extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    }
    
    render() {
		
		const email_id = this.props.email_id;
        const password = this.props.password;
        
		return(
		
			<Layout> 
			
			Hai Login
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
        dispatch({ type: "SET_PASSWORD",  payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

