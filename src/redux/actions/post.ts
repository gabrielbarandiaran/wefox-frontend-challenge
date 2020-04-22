import axios from 'axios'
import { Post } from '../types/Post'
import { AppActions } from '../types/actions'
import { Dispatch } from 'redux'

const url = "https://wf-challenge-7sibao3pxp.herokuapp.com/api/v1/posts"

const addPost = (post: Post): AppActions => ({
  type: "ADD_POST",
  post
});

const removePost = ( id?: number ): AppActions => ({
  type: "REMOVE_POST",
  id
});

const updatePost = (post: Post): AppActions => ({
  type: "UPDATE_POST",
  post
});

const setPost = (post: Post): AppActions => ({
  type: "SET_POST",
  post
});

const setPosts = (posts: Post[]): AppActions => ({
  type: "SET_POSTS",
  posts
});

const setIsFetching = (isFetching: boolean): AppActions => ({
  type: "SET_FETCHING",
  isFetching
});

export const setError = (error: string): AppActions => ({
  type: "SET_ERROR",
  error
});

export const startAddPost = (post : Post) => async (dispatch: Dispatch) => {
    
  setIsFetching(true);
  await axios.post(url, post)
  .then(res => {
    setError("");
    setIsFetching(false);
    return dispatch(
      addPost({
        ...post
      })
    )}
  ).catch(err => {
    setIsFetching(false);
    let error = "There was a problem adding your post. Please check if the fields are correct or contact support"
    return dispatch(
      setError(error)
    )
  })
};

export const startRemovePost = ( id?: number ) => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  await axios.delete(url + '/' + id)
  .then(res => {
    setError("");
    setIsFetching(false);
    return dispatch(
      removePost(id)
    )
  })
  .catch(err => {
    setIsFetching(false);
    let error = "There was a problem removing your post. Please contact support"
    return dispatch(
      setError(error)
    )
  })
};

export const startUpdatePost = ( post: Post ) => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  await axios.put(url + '/' + post.id, post)
  .then(res => {
    setError("");
    setIsFetching(false);
    return dispatch(
      updatePost({
        ...post
      })
    )
  })
  .catch(err => {
    setIsFetching(false);
    let error = "There was a problem editing your post. Please check if the fields are correct or contact support"
    return dispatch(
      setError(error)
    )
  })
};

export const startSetPost = ( id: number ) => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  await axios.get(url + '/' + id)
  .then(res => {
    const post = res.data;
    setError("");
    setIsFetching(false);
    return dispatch(
      setPost({
        ...post
      })
    )
  })
  .catch(err => {
    setIsFetching(false);
    let error = "There was a problem fetching this specific post. Please contact support"
    return dispatch(
      setError(error)
    )
  })
};

export const startSetEmptyPost = () => {
  
  const post = {
    id: undefined,
    title: "",
    content: "",
    lat: "",
    long: "",
    image_url: "",
  }

  return (dispatch: Dispatch<AppActions>) => {
    dispatch(setPost(post));
  };
};

export const startSetPosts = () => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  await axios.get(url)
  .then(res => {
    let posts = res.data;
    setError("");
    setIsFetching(false);
    return dispatch(
      setPosts([
        ...posts
      ])
    )
  })
  .catch(err => {
    setIsFetching(false);
    let error = "There was a problem fetching the posts. Please contact support"
    return dispatch(
      setError(error)
    )
  })
};
