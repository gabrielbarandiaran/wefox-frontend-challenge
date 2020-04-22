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

const setError = (error: string): AppActions => ({
  type: "SET_ERROR",
  error
});

export const startAddPost = (post : Post) => async (dispatch: Dispatch) => {
    
  const res = await axios.post(url, post)

  if(res.status === 201) {
    setError("");
    console.log('success')
    return dispatch(
      addPost({
        ...post
      })
    )
  } else {
    let error = "There was a problem adding your post. Please check if the fields are correct or contact support"
    return dispatch(
      setError(error)
    )
  }
};

export const startRemovePost = ( id?: number ) => async (dispatch: Dispatch) => {
  
  const res = await axios.delete(url + '/' + id);

  if(res.status === 204) {
    setError("");
    return dispatch(
      removePost(id)
    )
  } else {
    let error = "There was a problem removing your post. Please contact support"
    return dispatch(
      setError(error)
    )
  }

};

export const startUpdatePost = ( post: Post ) => async (dispatch: Dispatch) => {
  
  const res = await axios.put(url + '/' + post.id, post);

  if(res.status === 200) {
    setError("");
    return dispatch(
      updatePost({
        ...post
      })
    )
  } else {
    let error = "There was a problem editing your post. Please check if the fields are correct or contact support"
    return dispatch(
      setError(error)
    )
  }
};

export const startSetPost = ( id: number ) => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  const res = await axios.get(url + '/' + id);
  const post = res.data;
  
  if(res.status === 200) {
    setError("");
    return dispatch(
      setPost({
        ...post
      })
    )
  } else {
    let error = "There was a problem fetching this specific post. Please contact support"
    return dispatch(
      setError(error)
    )
  }
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
  const res = await axios.get(url);
  let posts = res.data;

  if(res.status === 200) {
    setError("");
    return dispatch(
      setPosts([
        ...posts
      ])
    )
  } else {
    let error = "There was a problem fetching the posts. Please contact support"
    return dispatch(
      setError(error)
    )
  }
};
