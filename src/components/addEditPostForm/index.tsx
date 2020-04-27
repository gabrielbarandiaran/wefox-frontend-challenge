import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { startUpdatePost, startAddPost, setError } from 'redux/actions/post';
import { startSetAppInterface } from 'redux/actions/application';
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
import { Post } from 'redux/types/Post';
// Material UI
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

interface PostCardProps {
  post?: Post;
  error?: string;
}

type Props = PostCardProps & LinkDispatchProps & LinkStateProps;

const AddEditPostForm: React.FC<Props> = (props) => {
  const [formPost, setFormPost] = useState<Post>({
    id: props.post?.id || undefined, 
    title: props.post?.title || "", 
    content: props.post?.content || "", 
    lat: props.post?.lat || "", 
    long: props.post?.long || "", 
    image_url: props.post?.image_url || ""
  });

  const handleCancelClick = () => {
    if(formPost.id === undefined) {
      props.startSetAppInterface("dashboard");
    } else {
      props.startSetAppInterface("postDetail");
    }
  }

  const handleSendClick = () => {
    const lat = parseInt(formPost.lat, 10)
    const long = parseInt(formPost.long, 10)
    
    if(formPost.title === "") {
      return props.setError("Title can't be empty.")
    }

    if(formPost.lat === "" || formPost.long === "") {
      return props.setError("Coordinates can't be empty.")
    } else {
      if(isNaN(lat) === true || isNaN(long) === true) {
        return props.setError("Coordinates must be valid degrees.")
      } else {
        if(lat < -90 || lat > 90) {
          return props.setError("Latitude must be between -90 and 90 degrees.")
        } else {
          if(long < -180 || long > 180) {
            return props.setError("Longitude must be between -180 and 180 degrees")
          }
        }
      }
    }

    if(formPost.content.length < 15 || formPost.content.length > 70) {
      return props.setError("Content must be at least 15 and up to 70 characters long!")
    } 

    if(formPost.id === undefined) {
      props.startAddPost(formPost);
      props.setError("Post added successfully!!")
      props.startSetAppInterface("dashboard");
    } else {
      props.startUpdatePost(formPost);
      props.setError("Post edited successfully!!")
      props.startSetAppInterface("postDetail");
    }
  }

  return(
    <>
      <Helmet>
        <title>Sweet Spot | {formPost.id === undefined ? "Add Post" : "Edit Post"}</title>
      </Helmet>
      <Paper classes={{root: "addEditPostFormBody"}}>
        <Grid>
          <Row>
            <Col xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                style={{margin:'1rem 0'}}
                label="Title" 
                value={formPost.title}
                onChange={e => setFormPost({...formPost, title: e.target.value})}/>
            </Col>
            <Col xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                style={{margin:'1rem 0'}}
                label="Image URL" 
                value={formPost.image_url}
                onChange={e => setFormPost({...formPost, image_url: e.target.value})}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                style={{margin:'1rem 0'}}
                label="Latitude" 
                value={formPost.lat}
                onChange={e => setFormPost({...formPost, lat: e.target.value})}/>
            </Col>
            <Col xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                style={{margin:'1rem 0'}}
                label="Longitude" 
                value={formPost.long}
                onChange={e => setFormPost({...formPost, long: e.target.value})}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12}>
              <TextField 
                required 
                fullWidth 
                multiline 
                style={{margin:'1rem 0'}}
                label="Content" 
                value={formPost.content}
                onChange={e => setFormPost({...formPost, content: e.target.value})}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={9}>
              <div>
                <button 
                  className="button"
                  onClick={() => handleSendClick()}>
                  {formPost.id === undefined ? "Add Post" : "Edit Post"}
                </button>
                <button 
                  className="button"
                  onClick={() => handleCancelClick()}>
                  CANCEL
                </button>
              </div>
            </Col>
          </Row>
        </Grid>
      </Paper>
    </>
  )
}

interface LinkStateProps {
  post?: Post;
  error?: string;
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addEditPost") => void;
  startUpdatePost: (post: Post) => void;
  startAddPost: (post: Post) => void;
  setError: (error: string) => void;
}

const mapStateToProps = (state: AppState, props: PostCardProps): LinkStateProps => ({
  post: state.posts.post,
  error: state.posts.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: PostCardProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch),
  startUpdatePost: bindActionCreators(startUpdatePost, dispatch),
  startAddPost: bindActionCreators(startAddPost, dispatch),
  setError: bindActionCreators(setError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPostForm);