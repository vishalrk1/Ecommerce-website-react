import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, creatUserProfileDocument, getCurrentUser } from '../../components/firebase/firebase.util';

import { 
    googleSignInSucess, 
    googleSignFailure, 
    emailSignInSucess, 
    emailSignFailure, 
    signOutSucess, 
    signOutFaliure,
    signUpFaliure,
    signUpSucess
} from './user.actions';

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(creatUserProfileDocument, user);
        const userSnapShot = yield userRef.get();

        yield put(googleSignInSucess({id: userSnapShot.id, ...userSnapShot.data() }))
    } catch(error){
        yield put(googleSignFailure(error));
    }
};

export function* signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(creatUserProfileDocument, user);
        const userSnapShot = yield userRef.get();

        yield put(emailSignInSucess({id: userSnapShot.id, ...userSnapShot.data() }))
    } catch(error){
        yield put(emailSignFailure(error));
    }
};

export function* isUserAuthenticated (){
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const userRef = yield call(creatUserProfileDocument, userAuth);
        const userSnapShot = yield userRef.get();
        yield put(googleSignInSucess({id: userSnapShot.id, ...userSnapShot.data() }))
    } catch (error){
        yield put(googleSignFailure(error));
    }
}

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSucess());
    } catch (error){
        yield put(signOutFaliure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSucess({user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFaliure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    try{
        const userRef = yield call(creatUserProfileDocument, user, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSucess({id: userSnapshot.id, ...userSnapshot}))
    } catch (error) {
        yield put(googleSignFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
};

export function* onSignUpSucess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCESS, signInAfterSignUp);
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpSucess),
    ]);
};


