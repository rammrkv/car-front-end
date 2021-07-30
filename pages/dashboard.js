import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import axios from 'axios';

if (typeof window === 'undefined') {
    global.window = {};
}

class DashBoard extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.getMyCarDetails = this.getMyCarDetails.bind(this);
    }
    
    async getMyCarDetails()
    {
		const { setCarInfo } = this.props;
		 
		const resp = await axios.post(
							API_URL+'/getCarList',
							{},
							{headers: {"Content-Type" : "application/json", "Authorization" :"bearer "+window.localStorage.carJwt }}
						);
						
		if(resp.data && resp.data.Car){
			setCarInfo(resp.data.Car);
		}
	}
	
    async componentDidMount() {
		
		var userLoggedIn = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		if(!userLoggedIn){
			return this.props.router.push('/');
		}
		
		await this.getMyCarDetails();
	}
	
    render() {
		
		const { carDetails } = this.props;
		
		const columns = [
			{title: "Brand", accessor: "brand" },
			{title: "Model", accessor: "model" },
			{title: "Year", accessor: "model_year" },
			{title: "Colour", accessor: "colour" },
			{title: "Registration No", accessor: "registration_no" },
			{title: "Mileage", accessor: "mileage_drove" },
			{title: "Status", accessor: "status" },
			{title: "Published", accessor: "is_published" }
		  ];
		  
		return(
		
			<Layout>
				<h2 >My Cars</h2>
				<table >
					<thead>
						<tr>
							<th key="sno">Sno</th>
							{columns.map((col) => (
								<th key={col.accessor}>{col.title}</th>
							))}
							<th key="action">Action</th>
							</tr>
						</thead>
						<tbody>
							{carDetails.map((carVal, i) => (
							  <tr key={i}>
								<td key={i+1}>{i+1}</td>
								{columns.map((col) => (
								  <td key={col.id}>{carVal[col.accessor]}</td>
								))}
								<td key="action">
									<button >Edit</button>
									<button >Delete</button>
								</td>
							  </tr>
							))}
						</tbody>
				</table>
			</Layout>
			
		)
	}
}

const mapStateToProps = state => ({
    ...state.dashboard,
    carDetails:state.dashboard.carDetails,
    userLoggedIn:state.auth.userLoggedIn
});

const mapDispatchToProps = dispatch => ({
    setCarInfo: value =>
        dispatch({ type: "SET_CAR_INFO", payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));

