const initialState = {
    itinerary: [],
    itineraries: []
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'get_itineraries_by_city_id':
            return {
                ...state,
                itinerary: action.payload
            }

            case 'get_itineraries':
                return {
                    ...state,
                    itineraries: action.payload
                }

        default:
            return state
    }
}

export default itinerariesReducer