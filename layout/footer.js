const headerStyle = {
  backgroundColor: "grey",
  color: "white",
  width: "100%",
  height: "50px"
};

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config'

class Footer extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    render() {
		
		return(
		
			<div className="Footer" style={headerStyle}>
				Footer
			 </div>
			)
	}
}


export default withRouter(Footer);
