const headerStyle = {
  backgroundColor: "blue",
  color: "white",
  width: "100%",
  height: "50px"
};

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config'
import Head from 'next/head';
import axios from 'axios';

if (typeof window === 'undefined') {
    global.window = {};
}

class Header extends React.Component {
	
	constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout()
    {
		 const { router} = this.props;
		 window.localStorage.setItem('carJwt', '');
		 router.push('/');
	}
	
	async componentDidMount() {
		
		const {  setLoginCheck , setUserInfo , customer } = this.props;
		
		var userLoggedIn = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		setLoginCheck(userLoggedIn);
		
		if(userLoggedIn){
			
			const resp = await axios.get(
							API_URL+'/getCurrentUser',
							{headers: {"Content-Type" : "application/json", "Authorization" :"bearer "+window.localStorage.carJwt }}
						);
			
			if(resp.data.Status && resp.data.Status == 'LF'){
				this.handleLogout();
			}
			
			if(resp.data.User){
				setUserInfo(resp.data.User);
			}
		}
	}
    
    render() {
		
		const {  router , userLoggedIn , customer } = this.props;
				
		return(

			<React.Fragment>
				<Head>
				  <title>Car App</title>
				  <link rel="icon" href="/favicon.ico" />
				</Head>
				
				<div className="Header" style={headerStyle}>
					{
						(() => {

							if(userLoggedIn && customer.fisrt_name){
								
								return(
									<div className="Header" style={headerStyle}>Welcome {customer.fisrt_name} {customer.last_name}
									<button onClick={()=>router.push('/dashboard')}>Dashboard</button>
									<button onClick={()=>router.push('/')}>Home</button>
									<button onClick={this.handleLogout}>Logout</button>
									</div>
								);
							}
							else{
								
								return(
								
									<div className="Header" style={headerStyle}>
										<button onClick={()=>router.push('/login')}>Sing-In</button>
										<button onClick={()=>router.push('/register')}>Register</button>
										<button onClick={()=>router.push('/')}>Home</button>
									 </div>
								);
							}
							
						})()
					}
				</div>
				
			</React.Fragment>

		)
	
	}
}

const mapStateToProps = state => ({
    ...state.auth,
    userLoggedIn : state.auth.userLoggedIn,
    customer : state.auth.customer
});

const mapDispatchToProps = dispatch => ({
    setLoginCheck: value =>
        dispatch({ type: "SET_USER_LOGIN", payload : value }),
    setUserInfo: value =>
        dispatch({ type: "SET_USER_INFO", payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
