import React, {useState} from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startUpdatePost, startAddPost } from 'redux/actions/post'
import { startSetAppInterface } from 'redux/actions/application'
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
import { Post } from 'redux/types/Post';
// Material UI
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

interface PostCardProps {
  post?: Post,
  error?: string
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
  })

  const handleCancelClick = () => {
    if(formPost.id === undefined) {
      props.startSetAppInterface("dashboard");
    } else {
      props.startSetAppInterface("postDetail");
    }
  }

  const handleSendClick = () => {
    if(formPost.id === undefined) {
      props.startAddPost(formPost);
      if(props.error === "") {
        props.startSetAppInterface("dashboard");
      } else {

      }
    } else {
      props.startUpdatePost(formPost);
      if(props.error === "") {
        props.startSetAppInterface("postDetail");
      } else {
        
      }
    }
  }

  return(
    <Paper classes={{root: "addEditPostFormBody"}}>
      <Grid>
        <Row>
          <Col xs={12} lg={4}>
            <TextField 
              required 
              fullWidth 
              label="Title" 
              value={formPost.title}
              onChange={e => setFormPost({...formPost, title: e.target.value})}/>
          </Col>
          <Col xs={12} lgOffset={1} lg={4}>
            <TextField 
              required 
              fullWidth 
              label="Image URL" 
              value={formPost.image_url}
              onChange={e => setFormPost({...formPost, image_url: e.target.value})}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <TextField 
              required 
              fullWidth 
              label="Latitude" 
              value={formPost.lat}
              onChange={e => setFormPost({...formPost, lat: e.target.value})}/>
          </Col>
          <Col xs={12} lgOffset={1} lg={4}>
            <TextField 
              required 
              fullWidth 
              label="Longitude" 
              value={formPost.long}
              onChange={e => setFormPost({...formPost, long: e.target.value})}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <TextField 
              required 
              fullWidth 
              multiline 
              label="Content" 
              value={formPost.content}
              onChange={e => setFormPost({...formPost, content: e.target.value})}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <Button 
              size="large"
              onClick={() => handleSendClick()}>
              ADD POST
            </Button>
            <Button 
              size="large"
              onClick={() => handleCancelClick()}>
              CANCEL
            </Button>
          </Col>
        </Row>
      </Grid>
    </Paper>
  )
}

interface LinkStateProps {
  post?: Post,
  error?: string
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addEditPost") => void;
  startUpdatePost: (post: Post) => void;
  startAddPost: (post: Post) => void;
}

const mapStateToProps = (state: AppState, props: PostCardProps): LinkStateProps => ({
  post: state.posts.post,
  error: state.posts.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: PostCardProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch),
  startUpdatePost: bindActionCreators(startUpdatePost, dispatch),
  startAddPost: bindActionCreators(startAddPost, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPostForm);