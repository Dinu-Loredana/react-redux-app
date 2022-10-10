import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

// REDUX_DEVTOOLS_EXTENSION_COMPOSE and reduxImmutableStateInvariant middleware are not used in PRODUCTION
