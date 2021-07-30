const cardStyle = {
  border: "solid 1px",
  float: "left",
  width: "200px"
};

import Layout from '../layout/layout'

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { API_URL } from '../config';
import { Row, Col, Label, Modal, ModalBody} from 'reactstrap';

class Index extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
		
		const { getCarDetails } = this.props;
		
		const avblCars = await fetch(API_URL+'/getAvblCarList',{method:'POST'}).then(res=>res.json());
		
		if(avblCars.Status && avblCars.Status == 'Sucess' && avblCars.Car && avblCars.Car.length){
			getCarDetails(avblCars.Car);
		}
	}
    
    render() {
		
		const { carDetails , router , toggleModel , modelOpen , carData , setCarData} = this.props;
		
		return(
		
			<Layout> 
				<section>
					<Row>
					{
						carDetails.map((carData, carInx) => {
							
							return (
								<Col md="3" style={cardStyle} key={carInx}>
									<div >

										<div >
											<h2 >{carData.brand}</h2>
											<h3 >{carData.model}</h3>
											
											<p>{carData.model_year} ({carData.colour})</p>
											<button onClick={()=>setCarData(carData)}>Car Details</button>
										</div>

									</div>
								</Col>
							)
						})
					}
					</Row>
				</section>			
				{
					(() => {

						if(carData.brand){
							
							return (
					
								<Modal isOpen={modelOpen} toggle={toggleModel}>
									<ModalBody >
									
									<div >
									<h2 >Car Details <button onClick={toggleModel}>Close</button></h2>
									</div>
									
									<table>
										<tr>
											<td><Label>Brand :</Label></td>
											<td>{carData.brand}</td>
										</tr>
										<tr>
											<td><Label>Model :</Label></td>
											<td>{carData.model}</td>
										</tr>
										<tr>
											<td><Label>Year :</Label></td>
											<td>{carData.model_year}</td>
										</tr>
										<tr>
											<td><Label>Colour :</Label></td>
											<td>{carData.colour}</td>
										</tr>
										<tr>
											<td><Label>Mileage :</Label></td>
											<td>{carData.mileage_drove}</td>
										</tr>
										<tr>
											<td><Label>Registration :</Label></td>
											<td>{carData.registration_no}</td>
										</tr>
										<tr>
											<td><Label>Owner :</Label></td>
											<td>{carData.user.fisrt_name} {carData.user.last_name} ({carData.user.email_id})</td>
										</tr>
									</table>
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
	carDetails:state.carInfo.carDetails,
	modelOpen:state.carInfo.modelOpen,
	carData:state.carInfo.carData,
	
});

const mapDispatchToProps = dispatch => ({
    getCarDetails: value =>
        dispatch({
      type: 'GET_CAR_INFO',
      payload:value
    }),
    setCarData: value =>
        dispatch({
      type: 'SET_CAR_DATA',
      payload:value
    }),
    toggleModel: () =>
        dispatch({
      type: 'TOGLE_MODEL'
    })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
