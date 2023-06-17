import ShopActionsTypes from "./shop.types";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionsTypes.FETCH_COLLECTIONS_START:
      console.log(state.isFetching);
      return {
        ...state,
        isFetching: true
      };
    case ShopActionsTypes.FETCH_COLLECTIONS_SUCESS:
      console.log(state.isFetching);
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      };
    case ShopActionsTypes.FETCH_COLLECTIONS_FAILURE:
      console.log(state.isFetching);
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;