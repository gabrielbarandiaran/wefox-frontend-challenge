import React from 'react';
import { Helmet } from 'react-helmet';
import GoogleMapReact from 'google-map-react';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { startSetAppInterface } from 'redux/actions/application';
import { startRemovePost } from 'redux/actions/post';
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
import { Post } from 'redux/types/Post';
//Material-UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Modal from '@material-ui/core/Modal';

interface PostCardProps {
  post?: Post
}

type Props = PostCardProps & LinkDispatchProps & LinkStateProps;

const PostCard: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCancelClick = () => {
    props.startSetAppInterface("dashboard");
  }

  const handleEditClick = () => {
    props.startSetAppInterface("addEditPost");
  }

  const handleDeleteClick = () => {
    if(props.post?.id !== undefined) {
      props.startRemovePost(props.post?.id);
      props.startSetAppInterface("dashboard");
    }
  }
  
  return(
    <>
      <Helmet>
        <title>Sweet Spot | {props.post?.title}</title>
      </Helmet>
      <Card classes={{root:"postCard"}}>
        <CardHeader
          title={<h3>{props.post?.title}</h3>}
          avatar={
            <IconButton 
              size="medium" 
              color="primary"
              onClick={() => handleCancelClick()}
              >
              <ArrowBack />
            </IconButton>
          }
          />
        <CardActionArea
          onClick={() => handleModalOpen()}>
          <CardMedia
            component="img"
            alt={props.post?.title}
            height="200"
            image={props.post?.image_url}
            title={props.post?.title}
          />
        </CardActionArea>
        <CardContent>
          <p>{props.post?.content}</p>
        </CardContent>
        <CardActions>
          <div style={{marginLeft:'.5rem'}}>
            <button 
              className="button"
              onClick={() => handleEditClick()}
              >
                Edit
            </button>
            <button 
              className="button"
              onClick={() => handleDeleteClick()}
              >
                Delete
            </button>
          </div>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleModalClose}
        style={{top:"15vh", left:"15vw"}}
      >
        <div style={{ height: '70vh', width: '70vw' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyASxDXRv350HDe2iGIyfnHkJWVURAJnNkM' }}
            defaultCenter={{lat: (parseInt(props.post?.lat !== undefined ? props.post?.lat : "" ) + .50), lng: (parseInt(props.post?.long !== undefined ? props.post?.long : "" ) + 0.4)}}
            defaultZoom={12}
          />
        </div>
      </Modal>
    </>
  )
}

interface LinkStateProps {
  post?: Post
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addEditPost") => void;
  startRemovePost: (id: number) => void;
}

const mapStateToProps = (state: AppState, props: PostCardProps): LinkStateProps => ({
  post: state.posts.post
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: PostCardProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch),
  startRemovePost: bindActionCreators(startRemovePost, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);