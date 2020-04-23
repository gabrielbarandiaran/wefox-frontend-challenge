import React, {useState, useEffect} from 'react';
// Redux
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from 'redux/types/actions';
import { connect } from 'react-redux';
import { AppState } from 'redux/store/configureStore';
import { setError } from 'redux/actions/post'
//Containers
import Dashboard from './dashboard';
import PostDetail from './postDetail';
import AddEditPost from './addEditPost';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

interface MainPageProps {
  activeInterface: "dashboard" | "postDetail" | "addEditPost";
  isFetching: boolean;
  error?: string;
}


type Props = MainPageProps & LinkStateProps & LinkDispatchProps;

const Backdrop = () => {
  return(
    <div className='backdrop'>
      <CircularProgress size={75} classes={{root: "loadingAnime"}} />
    </div>
  )
}

const Main: React.FC<Props> = (props) => {
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if(props.error !== "") {
      // Display error if there is one
      setAlertOpen(true);
      setTimeout(() => {
        // Close error and empty error state after the error has been informed
        setAlertOpen(false);
        props.setError("")
      }
      ,4000);
    }
  })


  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  }

  return(
    <div> 
      {props.activeInterface === "dashboard" && <Dashboard />}
      {props.activeInterface === "postDetail" && <PostDetail />}
      {props.activeInterface === "addEditPost" && <AddEditPost />}
      {props.isFetching && <Backdrop />}
      <Snackbar open={alertOpen} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {props.error}
        </Alert>
      </Snackbar>
    </div>
  )
}

interface LinkStateProps {
  activeInterface: "dashboard" | "postDetail" | "addEditPost";
  isFetching: boolean;
  error?: string;
}
 
interface LinkDispatchProps {
  setError: (error: string) => void;
}

const mapStateToProps = (
  state: AppState,
  props: MainPageProps
): LinkStateProps => ({
  activeInterface: state.application.activeInterface,
  isFetching: state.posts.isFetching,
  error: state.posts.error
});
 
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: MainPageProps): LinkDispatchProps => ({
  setError: bindActionCreators(setError, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);