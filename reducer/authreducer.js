const initialState = {
  email: '',
  password: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
	  
    case 'LOGIN':
    
    console.log('LOGIN');
    console.log(state);
    
      return {
        ...state
      }
    default:
      return state
  }
}

export default authReducer;
