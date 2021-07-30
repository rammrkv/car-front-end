import Layout from '../layout/layout';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import axios from 'axios';
import { Row, Col, Label, Modal, ModalBody} from 'reactstrap';
import Select from 'react-select';

if (typeof window === 'undefined') {
    global.window = {};
}

const dangerStyle = {
  color: "red"
};

class DashBoard extends React.Component {
	
	constructor(props) {
        super(props);
        
        this.getMyCarDetails = this.getMyCarDetails.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.statusSelectChange = this.statusSelectChange.bind(this);
        this.publishSelectChange = this.publishSelectChange.bind(this);
        
        this.changeBrand = ev => this.props.onChangeBrand(ev.target.value);
        this.changeModel = ev => this.props.onChangeModel(ev.target.value);
        this.changeYear = ev => this.props.onChangeYear(ev.target.value);
        this.changeColour = ev => this.props.onChangeColour(ev.target.value);
        this.changeRegistration = ev => this.props.onChangeRegistration(ev.target.value);
        this.changeMileage = ev => this.props.onChangeMileage(ev.target.value);
    }
    
    async getMyCarDetails()
    {
		const { setCarInfo , setErrorMessage} = this.props;
		 
		const resp = await axios.post(
							API_URL+'/getCarList',
							{},
							{headers: {"Content-Type" : "application/json", "Authorization" :"bearer "+window.localStorage.carJwt }}
						);
						
		if(resp.data && resp.data.Car){
			setCarInfo(resp.data.Car);
			setErrorMessage('');
		}
	}
	
	handleSubmit(e)
    {
		 e.preventDefault();
		 
		 const { setErrorMessage , carData , setCarInfo } = this.props;
		 
		 let urlVal = 'addCar';
		 
		 if(carData.car_id){
			 urlVal = 'updateCarInfo';
		 }
		  axios
            .post(
               API_URL+'/'+urlVal,
                carData,
                {headers: {"Content-Type": "application/json", "Authorization" :"bearer "+window.localStorage.carJwt}}
            ).then(async function (response) {
                
                if(response.data.Status == 'Success'){
					
					setErrorMessage('Car updated');
					
					//this.getMyCarDetails();
					
					//alert(123);
					
					const resp = await axios.post(
							API_URL+'/getCarList',
							{},
							{headers: {"Content-Type" : "application/json", "Authorization" :"bearer "+window.localStorage.carJwt }}
						);
						
					if(resp.data && resp.data.Car){
						setCarInfo(resp.data.Car);
						setTimeout(function(){ setErrorMessage('') }, 1500);
					}
				}
				else{
					setErrorMessage(response.data.Msg);
				}
				
            })
            .catch(function (error) {
				
				console.log('');
				console.log('');
				console.log(error);
				console.log('');
				console.log('');
				
                setErrorMessage('Unkonwn Error');
            });
	}
	
	statusSelectChange(selectedOption)
	{
		const { carData , setStatusChange } = this.props;
		
		setStatusChange(selectedOption.value);
	}
	
	publishSelectChange(selectedOption)
	{
		const { carData , setPublishChange } = this.props;
		
		setPublishChange(selectedOption.value);
	}
	
    async componentDidMount() {
		
		const { closeModel } = this.props;
		
		closeModel();
		
		var userLoggedIn = (window.localStorage && window.localStorage.carJwt) ? true : false;
		
		if(!userLoggedIn){
			return this.props.router.push('/');
		}
		
		await this.getMyCarDetails();
	}
	
    render() {
		
		const { carDetails, modelOpen, addNewCar , toggleModel , carData , setCarData, addCarErr } = this.props;
		
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
		  
		const statusOptions = [
		  { value: 'A', label: 'Active' },
		  { value: 'IA', label: 'In-Active' }
		];
		
		const publishOptions = [
		  { value: 'Y', label: 'Yes' },
		  { value: 'N', label: 'No' }
		];
		
		const statusDisps = { 'A': 'Active', 'IA' : 'In-Active' };
		const publishDisps = { 'Y': 'Yes', 'N' : 'No' };
		
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
						
						{
							(() => {

								if(!carDetails.length){
									
									return (
										<tbody>
											<tr><td>No cars found</td></tr>
										</tbody>
									)
								}
								
							return '';
							
							})()
						}
							
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
												onChange={this.changeBrand}
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
												onChange={this.changeModel}
												/>
											</td>
										</tr>
										<tr>
											<td>Colur</td>
											<td>
												<input
												type="text"
												className="form-control"
												id="colour"
												placeholder="Enter colour"
												required
												name="colour"
												value={carData.colour}
												onChange={this.changeColour}
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
												maxlength="4"
												value={carData.model_year}
												onChange={this.changeYear}
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
												onChange={this.changeRegistration}
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
												onChange={this.changeMileage}
												/>
											</td>
										</tr>
										<tr>
											<td>Status</td>
											<td>
												<Select
												id="status"
												name="status"
												value={{value:carData.status,label:statusDisps[carData.status]}}
												onChange={this.statusSelectChange}
												options={statusOptions}
											  />
											</td>
										</tr>
										<tr>
											<td>Publish</td>
											<td>
												<Select
												id="status"
												name="status"
												value={{value:carData.is_published,label:publishDisps[carData.is_published]}}
												onChange={this.publishSelectChange}
												options={publishOptions}
											  />
											</td>
										</tr>
										
										<tr>
											<td>
											</td>
											<td>
												{addCarErr ? (
													<div style={dangerStyle}>
														{addCarErr}
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
    onChangeBrand: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'brand', value }),
    onChangeModel: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'model', value }),
    onChangeYear: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'model_year', value }),
    onChangeColour: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'colour', value }),
    onChangeRegistration: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'registration_no', value }),
    onChangeMileage: value =>
        dispatch({ type: "UPDATE_FIELD", key: 'mileage_drove', value }),
    setCarInfo: value =>
        dispatch({ type: "SET_CAR_INFO", payload : value }),
    setCarData: value =>
        dispatch({ type: "SET_CAR_DATA", payload : value }),
    setStatusChange: value =>
        dispatch({ type: "SET_STATUS_CHANGE", payload : value }),
    setPublishChange: value =>
        dispatch({ type: "SET_PUBLISH_CHANGE", payload : value }),
    addNewCar: () =>
        dispatch({ type: "ADD_NEW_CAR" }),
    toggleModel: () =>
        dispatch({
      type: 'TOGLE_MODEL'
    }),
    closeModel: () =>
        dispatch({
      type: 'CLOSE_MODEL'
    }),
    setErrorMessage: value =>
        dispatch({ type: "SET_ERROR",  payload : value })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));

