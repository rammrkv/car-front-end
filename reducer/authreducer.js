const initialState = {
  email_id: '',
  password: '',
  loginError : '',
  userLoggedIn : false,
  customer : {}
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
    case 'SET_USER_INFO':
      return {
        ...state,
        customer: action.payload,
      }
    case 'SET_USER_LOGIN':
    
      return {
        ...state,
        userLoggedIn: action.payload,
      }
    case 'SET_ERROR':
    
      return {
        ...state,
        loginError: action.payload,
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
