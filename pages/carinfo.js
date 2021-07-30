const cardStyle = {
  border: "solid 1px",
  float: "left",
  width: "200px"
};

import Layout from '../layout/layout'

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardLink, CardHeader } from 'reactstrap';

class CarInfo extends React.Component {
	
	constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
		
		const { setCarData } = this.props;
		
		console.log('');
		console.log('');
		console.log('AAAAAAAAAAA');
		console.log('');
		console.log('');
		
		/*const avblCars = await fetch(API_URL+'/getCar',{method:'GET'}).then(res=>res.json());
		
		if(avblCars.Status && avblCars.Status == 'Sucess' && avblCars.Car && avblCars.Car.length){
			setCarData(avblCars.Car);
		}*/
	}
    
    render() {
		
		const { carDetails , router } = this.props;
		
		return(
		
			<Layout> 
				 Car Info
			</Layout>
			
		)
	}
}


const mapStateToProps = state => ({
	carData:state.carInfo.carData
});

const mapDispatchToProps = dispatch => ({
    setCarData: value =>
        dispatch({
      type: 'SET_CAR_DATA',
      payload:value
    })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarInfo));
