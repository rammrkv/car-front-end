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
import Head from 'next/head'

if (typeof window === 'undefined') {
    global.window = {}
}

class Header extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    render() {
		
		const {  router  } = this.props;
		
		var currentUser = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		/*if(currentUser){
			
			return(
			
				<>
					<Head>
					  <title>Car App</title>
					  <link rel="icon" href="/favicon.ico" />
					</Head>
			
				<div className="Header" style={headerStyle}>Hai {window.localStorage.user.first_name}
				 </div>
				 
				</>
				)
		}
		else{
			
			return(
			
			<>
					<Head>
					  <title>Car App</title>
					  <link rel="icon" href="/favicon.ico" />
					</Head>
					
				<div className="Header" style={headerStyle}>
					<button onClick={()=>router.push('/login')}>Sing-In</button>
					<button onClick={()=>router.push('/register')}>Register</button>
				 </div>
				 
				</>
				)
		}*/
	
	
	return(
	
		<React.Fragment>
			<Head>
			  <title>Car App</title>
			  <link rel="icon" href="/favicon.ico" />
			</Head>
			
			<div className="Header" style={headerStyle}>
				{
					(() => {

						if(currentUser){
							
							return(
								<div className="Header" style={headerStyle}>Hai {window.localStorage.user.first_name}
								</div>
							);
						}
						else{
							
							return(
							
								<div className="Header" style={headerStyle}>
									<button onClick={()=>router.push('/login')}>Sing-In</button>
									<button onClick={()=>router.push('/register')}>Register</button>
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


export default withRouter(Header);
