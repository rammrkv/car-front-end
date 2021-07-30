import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import axios from 'axios';
import { Row, Col, Label, Modal, ModalBody} from 'reactstrap';

if (typeof window === 'undefined') {
    global.window = {};
}

class DashBoard extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.getMyCarDetails = this.getMyCarDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
	
	handleSubmit(e)
    {
		 e.preventDefault();
		 
	}
	
    async componentDidMount() {
		
		var userLoggedIn = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		if(!userLoggedIn){
			return this.props.router.push('/');
		}
		
		await this.getMyCarDetails();
	}
	
    render() {
		
		const { carDetails, modelOpen, addNewCar , toggleModel , carData , setCarData } = this.props;
		
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
				<h2 >My Cars <button onClick={addNewCar}>Add Car</button></h2>
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
									<button onClick={()=>setCarData(carVal)}>Edit</button>
									<button >Delete</button>
								</td>
							  </tr>
							))}
						</tbody>
				</table>
				
				{
					(() => {

						if(modelOpen){
							
							return (
					
								<Modal isOpen={modelOpen} toggle={toggleModel}>
									<ModalBody >
									
									<div >
									<h2 >Car Details <button onClick={toggleModel}>Close</button></h2>
									</div>
									
									<form
									acceptCharset="UTF-8"
									method="POST"
									id="ajaxForm"
									onSubmit={this.handleSubmit}
								>
								
									<table>
										<tr>
											<td>Brand</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="brand"
												placeholder="Enter brand"
												required
												name="brand"
												value={carData.brand}
												/>
											</td>
										</tr>
										<tr>
											<td>Model</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="model"
												placeholder="Enter model"
												required
												name="model"
												value={carData.model}
												/>
											</td>
										</tr>
										<tr>
											<td>Year</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="model_year"
												placeholder="Enter year"
												required
												name="model_year"
												value={carData.model_year}
												/>
											</td>
										</tr>
										<tr>
											<td>Registration No</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="registration_no"
												placeholder="Enter registration"
												required
												name="registration_no"
												value={carData.registration_no}
												/>
											</td>
										</tr>
										<tr>
											<td>Mileage</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="mileage_drove"
												placeholder="Enter mileage"
												required
												name="mileage_drove"
												value={carData.mileage_drove}
												/>
											</td>
										</tr>
									</table>
									   
								</form>
									
									</ModalBody>
								</Modal>
							)
						}
							
						return '';
					})()
				}
				
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
        dispatch({ type: "SET_CAR_INFO", payload : value }),
    setCarData: value =>
        dispatch({ type: "SET_CAR_DATA", payload : value }),
    addNewCar: () =>
        dispatch({ type: "ADD_NEW_CAR" }),
    toggleModel: () =>
        dispatch({
      type: 'TOGLE_MODEL'
    })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));

