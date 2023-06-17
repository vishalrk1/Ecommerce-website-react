import ShopActionsTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../components/firebase/firebase.util";

export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START
  });
  
export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCESS,
    payload: collectionsMap
  });
  
export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});
  
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
      const collectionRef = firestore.collection('collections');
      dispatch(fetchCollectionsStart());
      collectionRef
        .get()
        .then(snapshot => {
          const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
          console.log(collectionsMap);
          dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};



