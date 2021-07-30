const initialState = {
  carDetails : [],
  carData	: {},
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
