import React from 'react'
// Redux
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
//Containers
import { Dashboard } from './dashboard'
import PostDetail from './postDetail'
import AddPost from './addPost'

interface MainPageProps {
  activeInterface: "dashboard" | "postDetail" | "addPost"
}


type Props = MainPageProps & LinkStateProps;

const Main: React.FC<Props> = (props) => {
  return(
    <div> 
      {props.activeInterface === "dashboard" && <Dashboard />}
      {props.activeInterface === "postDetail" && <PostDetail />}
      {props.activeInterface === "addPost" && <AddPost />}
    </div>
  )
}

interface LinkStateProps {
  activeInterface: "dashboard" | "postDetail" | "addPost"
}

const mapStateToProps = (
  state: AppState,
  props: MainPageProps
): LinkStateProps => ({
  activeInterface: state.application.activeInterface
})

export default connect(mapStateToProps)(Main)