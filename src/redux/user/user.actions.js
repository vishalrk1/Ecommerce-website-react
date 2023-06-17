import UserActionTypes from "./user.types";

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER ,
    payload: user
});

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSucess = (user) => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCESS,
    payload: user
});

export const googleSignFailure = error => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_FALIURE,
    payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const emailSignInSucess = (user) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_SUCESS,
    payload: user
});

export const emailSignFailure = error => ({
    type: UserActionTypes.EMAIL_SIGN_IN_FALIURE,
    payload: error,
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSucess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCESS,
});

export const signOutFaliure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FALIURE,
    payload: error
});

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials,
});

export const signUpSucess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCESS,
    payload: { user, additionalData }
});

export const signUpFaliure = (error) => ({
    type: UserActionTypes.SIGN_UP_FALIURE,
    payload: error
})