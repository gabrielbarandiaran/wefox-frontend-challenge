import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { postsReducer } from "../reducers/posts";
import { AppActions } from "../types/actions";


export const rootReducer = combineReducers({
  posts: postsReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
    composeEnhancers()
  ),
);
