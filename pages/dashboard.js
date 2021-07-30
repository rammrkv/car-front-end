import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import { useForm } from 'react-hook-form';

if (typeof window === 'undefined') {
    global.window = {}
}

class DashBoard extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
		
		var currentUser = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		if(!currentUser){
			this.props.router.push('/');
		}
	}
	
    render() {
		
		return(
		
			<Layout> 
			
			Hai DashBoard
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));

