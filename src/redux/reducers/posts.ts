import { PostStateInterface } from '../types/Post'
import { PostActionTypes } from '../types/actions'

const initialPostState: PostStateInterface ={
  post: {
    title: "",
    content: "",
    lat: "",
    long: "",
    image_url: "",
  },
  posts: [],
  isFetching: false,
  error: ""
}

export const postsReducer = (state = initialPostState, action: PostActionTypes): PostStateInterface => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.post]
      }
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.post.id ? (post = action.post) : post)
      }
    case "SET_POST":
      return {
        ...state,
        post: action.post,
        isFetching: false
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.posts,
        isFetching: false
      };
      case "SET_FETCHING":
        return {
          ...state,
          isFetching: true
        };
      case "SET_ERROR":
        return {
          ...state,
          error: action.error
        }
    default:
      return state;
  }
};
