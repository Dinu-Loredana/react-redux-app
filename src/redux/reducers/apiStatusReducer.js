import initialState from "./initialState";
import * as types from "../actions/actionTypes";

//helper fn (if actiony type ends in SUCCESS suffix, means that api call ended fetching data, returned data successfully; decrement apiCallsInProgress state with 1)
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}
export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type)) {
    //handling same action type in multiple reducers ( LOAD_COURSE_SUCCESS handles by this reducer and also courseReducer)
    return state - 1;
  }
  return state;
}

/*
Each reducer is a slice of state. 
A given action may impact multiple reducers.
A given reducer will typically work with multiple actions.
Useful to keep reducers and action in separate folders (don't group them in feature folder as they may be used by other reducers/features).
Actions and reducers shouldn't be tied to a single portion of app (feature). Doing so, a sign that that state shouldn't be put in Redux at all (use local state - useState).
Don't forget to add the reference of this reducer into rootReducer.
*/
