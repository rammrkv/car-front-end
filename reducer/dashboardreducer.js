const initialState = {
  carDetails : [],
  carData	: {
					car_id : '',
					brand : '',
					model : '',
					model_year : '',
					colour : '',
					registration_no : '',
					mileage_drove : '',
					status : '',
					is_published : '',
				},
  modelOpen : false
}

const dashboardReducer = (state = initialState, action) => {
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
    case 'TOGLE_MODEL':
      return {
        ...state,
        modelOpen: !state.modelOpen,
      }
    default:
      return state
  }
}

export default dashboardReducer;
