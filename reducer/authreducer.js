const initialState = {
  email_id: '',
  password: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
	  
    case 'LOGIN':
    
      return {
        ...state
      }
      
    case 'SET_EMAIL':
    
      return {
        ...state,
        email_id: action.payload,
      }
    case 'SET_PASSWORD':
    
      return {
        ...state,
        password: action.payload,
      }
    default:
      return state
  }
}

export default authReducer;
