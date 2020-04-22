import React from 'react'
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startSetAppInterface } from 'redux/actions/application'
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
import { Post } from 'redux/types/Post';
//Material-UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

interface PostCardProps {
  post?: Post
}

type Props = PostCardProps & LinkDispatchProps & LinkStateProps;

const PostCard: React.FC<Props> = (props) => {

  const handleRowClick = () => {
    props.startSetAppInterface("dashboard");
  }

  return(
    <Card classes={{root:"postCard"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardContent>
        {props.post?.lat}
      </CardContent>
      <CardActions>
        <Button 
        size="large" 
        color="primary">
          Edit
        </Button>
        <Button size="large" color="primary">
          Delete
        </Button>
        <Button 
          size="large" 
          color="primary"
          onClick={() => handleRowClick()}>
          Go Back
        </Button>
      </CardActions>
    </Card>
  )
}

interface LinkStateProps {
  post?: Post
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addPost") => void;
}

const mapStateToProps = (state: AppState, props: PostCardProps): LinkStateProps => ({
  post: state.posts.post
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: PostCardProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);