const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  carDetails : {}
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
    case 'SETCARINFO':
    
    console.log('');
    console.log('');
    console.log('SETCARINFO');
    console.log('');
    console.log(action);
    console.log('');
      return {
        ...state,
        carDetails: action.payload,
      }
    default:
      return state
  }
}

export default testReducer;
