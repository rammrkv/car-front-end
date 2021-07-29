/*import { useSelector, useDispatch } from 'react-redux'

const useCounter = () => {
  const count = useSelector((state) => state.count)
  const dispatch = useDispatch()
  const increment = () =>
    dispatch({
      type: 'INCREMENT',
    })
  const decrement = () =>
    dispatch({
      type: 'DECREMENT',
    })
  const reset = () =>
    dispatch({
      type: 'RESET',
    })
  return { count, increment, decrement, reset }
}

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter*/


import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { API_URL } from '../config'

class Counter extends React.Component {

    constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
		
		const { getCarDetails } = this.props;
		
		const avblProbs = await fetch(API_URL+'/getAvblCarList',{method:'POST'}).then(res=>res.json());
		
		getCarDetails(avblProbs);
	}
    
    render() {
		
		const { count, increment , login , router , carDetails } = this.props;
		
		console.log('');
		console.log('--------------------');
		console.log('');
		console.log(carDetails);
		console.log('');
		console.log('');
		console.log('');
        return (
            <div>
			  <h1>
				Count: <span>{count}</span>
			  </h1>
			  <button onClick={increment}>+1</button>
			  <button onClick={login}>Login</button>
			  <button onClick={()=>router.push('/about')}>About</button>
			</div>
        );
    }
}

const mapStateToProps = state => ({
	count:state.test.count,
	carDetails:state.test.carDetails
});

const mapDispatchToProps = dispatch => ({
    increment: () =>
        dispatch({
      type: 'INCREMENT',
    }),
    login: () =>
        dispatch({
      type: 'LOGIN',
    }),
    getCarDetails: value =>
        dispatch({
      type: 'SETCARINFO',
      payload:value
    })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Counter));
