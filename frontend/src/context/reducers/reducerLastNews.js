import { LAST_POST_FAIL, LAST_POST_REQUEST, LAST_POST_SUCCESS } from "../constants/lastPostconstants";

export const lastNewsReducer = (state = { lastNews: [] }, action) => {
     switch (action.type) {
       case LAST_POST_REQUEST:
         return { loading: true, lastNews: [] };
       case LAST_POST_SUCCESS:
         return { loading: false, lastNews: action.payload };
       case LAST_POST_FAIL:
         return { loading: false, error: action.payload };
       default:
         return state;
     }
   };
   