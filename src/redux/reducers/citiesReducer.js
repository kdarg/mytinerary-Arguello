const initialState = {
    getCities: [],
    filterCities: [],
    cityById: {}
}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'all_cities':
            return {
                ...state,
                getCities: action.payload,
                filterCities: action.payload,
                cityById: action.payload
            }

            case "filter_cities": 
            
            let filter = state.getCities.filter((city) => (city.city.toLowerCase().startsWith(action.payload.toLowerCase().trim())))
            console.log(filter)
            return {
                ...state, 
                filterCities: filter
            }

            case "one_city": 
            return {
                ...state,
                cityById: action.payload 
            }

            default:
                return state
    }
}

export default citiesReducer;