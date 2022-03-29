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