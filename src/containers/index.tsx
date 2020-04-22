import React from 'react'
// Redux
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
//Containers
import { Dashboard } from './dashboard'
import PostDetail from './postDetail'
import AddEditPost from './addEditPost';
// Material-UI
import CircularProgress from '@material-ui/core/CircularProgress';

interface MainPageProps {
  activeInterface: "dashboard" | "postDetail" | "addEditPost";
  isFetching: boolean;
}


type Props = MainPageProps & LinkStateProps;

const Backdrop = () => {
  return(
    <div className='backdrop'>
      <CircularProgress size={75} classes={{root: "loadingAnime"}} />
    </div>
  )
}

const Main: React.FC<Props> = (props) => {
  return(
    <div> 
      {props.activeInterface === "dashboard" && <Dashboard />}
      {props.activeInterface === "postDetail" && <PostDetail />}
      {props.activeInterface === "addEditPost" && <AddEditPost />}
      {props.isFetching && <Backdrop />}
    </div>
  )
}

interface LinkStateProps {
  activeInterface: "dashboard" | "postDetail" | "addEditPost";
  isFetching: boolean;
}

const mapStateToProps = (
  state: AppState,
  props: MainPageProps
): LinkStateProps => ({
  activeInterface: state.application.activeInterface,
  isFetching: state.posts.isFetching
})

export default connect(mapStateToProps)(Main)