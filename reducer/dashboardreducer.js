const initialState = {
  carDetails : [],
  carData	: {
					car_id : 0,
					brand : '',
					model : '',
					model_year : '',
					colour : '',
					registration_no : '',
					mileage_drove : '',
					status : 'A',
					is_published : 'Y',
				},
  modelOpen : false,
  addCarErr : ''
}

const dashboardReducer = (state = initialState, action) => {
	
	let tmpCarData = state.carData;
	
  switch (action.type) {
    
    case 'SET_CAR_INFO':
    
      return {
        ...state,
        carDetails: action.payload,
      }
    case 'SET_CAR_DATA':
      return {
        ...state,
        carData: action.payload,
        modelOpen: true
      }
    case 'ADD_NEW_CAR':
      return {
        ...state,
        modelOpen: true,
        carData: initialState.carData
      }
    case 'SET_STATUS_CHANGE':
		
         tmpCarData.status = action.payload;
      return {
        ...state,
        carData: {
                    ...tmpCarData
                }
      }
    case 'SET_PUBLISH_CHANGE':
    
         tmpCarData.is_published = action.payload;
      return {
        ...state,
        carData: {
                    ...tmpCarData
                }
      }
      
    case 'UPDATE_FIELD':
    
      tmpCarData[action.key] = action.value;
          
      return {
        ...state,
        carData: {
                    ...tmpCarData
                }
      }
    case 'TOGLE_MODEL':
      return {
        ...state,
        modelOpen: !state.modelOpen,
      }
    case 'SET_ERROR':
      return {
        ...state,
        addCarErr: action.payload,
      }
     case 'CLOSE_MODEL':
      return {
        ...state,
        modelOpen: false,
        carData: initialState.carData
      }
    default:
      return state
  }
}

export default dashboardReducer;
