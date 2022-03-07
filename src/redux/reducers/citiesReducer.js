const initialState = {
    getCities: [],
    filterCities: [],
    cityById: []
    

}

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'all_cities':
            return {
                ...state,
                allCities: action.payload,
                filterCities: action.payload,
                cityById: action.payload
            }

            case "filter_cities": 
            return {
                ...state, 
                filterCities: state.getCities.filter((city) => (city.city.toLowerCase().startsWith(action.payload.toLowerCase().trim()))),
            }

            case "one_city": 
            return {
                ...state,
                cityById: action.payload //?? ? ?? ? ? ? ? ? ? 
            }



            default:
                return state
    }
}

export default citiesReducer;