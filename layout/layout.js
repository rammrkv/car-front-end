import Header from "./header";
import Footer from "./footer";

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config'

class Layout extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    render() {
		
		return(
		
			<div className="Layout" style={layoutStyle}>
			<Header />
			<div className="Content" style={contentStyle}>
			  {this.props.children}
			</div>
			<Footer />
		  </div>
		  
		 )
	}
}


export default withRouter(Layout);
