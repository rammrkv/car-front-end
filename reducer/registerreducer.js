const initialState = {
  first_name: '',
  last_name: '',
  email_id: '',
  password: '',
  registerError : '',
  userLoggedIn : false,
  customer : {}
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
	  
    case 'LOGIN':
    
      return {
        ...state
      }
      
    case 'SET_FIRST_NAME':
      return {
        ...state,
        first_name: action.payload,
      }
    case 'SET_LAST_NAME':
      return {
        ...state,
        last_name: action.payload,
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
    case 'SET_ERROR':
    
      return {
        ...state,
        registerError: action.payload,
      }
    default:
      return state
  }
}

export default registerReducer;
