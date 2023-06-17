import  UserActionTypes from "./user.types"

const INITIAL_STATE = {
    currentUser: null,
    error: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.GOOGLE_SIGN_IN_SUCESS:
        case UserActionTypes.EMAIL_SIGN_IN_SUCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            };
        case UserActionTypes.GOOGLE_SIGN_IN_FALIURE:
        case UserActionTypes.EMAIL_SIGN_IN_FALIURE:
        case UserActionTypes.SIGN_OUT_FALIURE:
        case UserActionTypes.SIGN_UP_FALIURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}

export default userReducer;  