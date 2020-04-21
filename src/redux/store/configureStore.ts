import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { postsReducer } from "../reducers/posts";
import { AppActions } from "../types/actions";

export const rootReducer = combineReducers({
  posts: postsReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
