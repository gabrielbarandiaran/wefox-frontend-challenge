import axios from 'axios'
import { Post } from '../types/Post'
import { AppActions } from '../types/actions'
import { AppState } from '../store/configureStore'
import { Dispatch } from 'redux'

const url = "https://wf-challenge-7sibao3pxp.herokuapp.com/api/v1/posts"

const addPost = (post: Post): AppActions => ({
  type: "ADD_POST",
  post
});

const removePost = ( id: number ): AppActions => ({
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

export const startAddPost = (postData : {
  title: string, 
  content: string, 
  lat: string, 
  long: string, 
  image_url: string}) => async (dispatch: Dispatch) => {
    
  const res = await axios.post(url, postData)

  const {
    title = "",
    content = "",
    lat = "",
    long = "",
    image_url = ""
  } = postData;

  const post = { title, content, lat, long, image_url };

  if(res.status === 200) {
    return dispatch(
      addPost({
        ...post
      })
    )
  } else {
    let error = "There was a problem Dx"
    return dispatch(
      setError(error)
    )
  }
};

export const startRemovePost = ( id: number ) => async (dispatch: Dispatch) => {
  
  const res = await axios.delete(url + '/' + id);

  if(res.status === 204) {
    return dispatch(
      removePost(id)
    )
  } else {
    let error = "There was a problem Dx"
    return dispatch(
      setError(error)
    )
  }

};

export const startUpdatePost = ( post: Post ) => async (dispatch: Dispatch) => {
  
  const res = await axios.put(url + '/' + post.id, post);

  if(res.status === 200) {
    return dispatch(
      updatePost({
        ...post
      })
    )
  } else {
    let error = "There was a problem Dx"
    return dispatch(
      setError(error)
    )
  }
};

export const startSetPost = ( id: number ) => async (dispatch: Dispatch) => {
  
  console.log("helo")
  setIsFetching(true);
  const res = await axios.get(url + '/' + id);
  const post = res.data;

  if(res.status === 200) {
    return dispatch(
      setPost({
        ...post
      })
    )
  } else {
    let error = "There was a problem Dx"
    return dispatch(
      setError(error)
    )
  }
};

export const startSetPosts = () => async (dispatch: Dispatch) => {
  
  setIsFetching(true);
  const res = await axios.get(url);
  let posts = res.data;

  if(res.status === 200) {
    return dispatch(
      setPosts({
        ...posts
      })
    )
  } else {
    let error = "There was a problem Dx"
    return dispatch(
      setError(error)
    )
  }
};