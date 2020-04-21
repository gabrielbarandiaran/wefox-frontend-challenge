export interface Post {
  id?: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
}

export interface PostStateInterface {
  post?: Post,
  posts: Post[],
  isFetching: Boolean,
  error: string
}