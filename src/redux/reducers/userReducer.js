const initialState = {
    user: null,
    message:null,
    newuser: {}
    
}

const userReducer = (state = initialState, action) => {
    
    
    switch (action.type) {
        case 'user':
            return {
                ...state,
                user: action.payload,   
                token: action.payload.token, // ?
                _id: action.payload._id  // ?
            }

        case 'message':
            return {
                ...state,
                message: action.payload,   
            }

            case 'newuser':
                return {
                    ...state,
                    newuser: action.payload,  
            }

        default:
            return state
    }
}
export default userReducer