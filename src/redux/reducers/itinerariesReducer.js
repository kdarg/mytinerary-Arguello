const initialState = {
    itinerary: [],
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'get_itineraries':
            return {
                ...state,
                itinerary: action.payload
            }
        default:
            return state
    }
}

export default itinerariesReducer