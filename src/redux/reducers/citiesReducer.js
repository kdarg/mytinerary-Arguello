const initialState = {
    getCities: [],
    searchedCity: [],
    cityById: []
    

}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'all_cities':
            return {
                ...state,
                allCities: action.payload,
                citySearched: action.payload,
                cityById: action.payload
            }
        default:
            return state
    }
}

export default citiesReducer;