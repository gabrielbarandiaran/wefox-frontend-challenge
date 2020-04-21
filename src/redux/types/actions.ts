import { Post } from "./Post"

export const ADD_POST = "ADD_POST"
export const UPDATE_POST = "UPDATE_POST"
export const REMOVE_POST = "REMOVE_POST"
export const SET_POST = "SET_POST"
export const SET_POSTS = "SET_POSTS"

export const SET_FETCHING = "SET_FETCHING"
export const SET_ERROR = "SET_ERROR"


export interface AddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

export interface UpdatePostAction {
  type: typeof UPDATE_POST;
  post: Post;
}

export interface RemovePostAction {
  type: typeof REMOVE_POST;
  id: number;
}

export interface SetPostAction {
  type: typeof SET_POST;
  post: Post;
}

export interface SetPostsAction {
  type: typeof SET_POSTS;
  posts: Post[];
}

export interface setPostIsFetching {
  type: typeof SET_FETCHING;
  isFetching: boolean;
}

export interface setError {
  type: typeof SET_ERROR;
  error: string;
}

export type PostActionTypes = 
  AddPostAction 
  | UpdatePostAction 
  | RemovePostAction 
  | SetPostAction 
  | SetPostsAction
  | setPostIsFetching
  | setError;

export type AppActions = PostActionTypes;

