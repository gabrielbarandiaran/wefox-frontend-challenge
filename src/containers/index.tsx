import React from 'react'
// Redux
import { connect } from "react-redux";
import { AppState } from "redux/store/configureStore";
//Containers
import { Dashboard } from './dashboard'
import PostDetail from './postDetail'

interface MainPageProps {
  activeInterface: "dashboard" | "postDetail"
}


type Props = MainPageProps & LinkStateProps;

const Main: React.FC<Props> = (props) => {
  return(
    <div> 
      {props.activeInterface === "dashboard" && <Dashboard />}
      {props.activeInterface === "postDetail" && <PostDetail />}
    </div>
  )
}

interface LinkStateProps {
  activeInterface: "dashboard" | "postDetail"
}

const mapStateToProps = (
  state: AppState,
  props: MainPageProps
): LinkStateProps => ({
  activeInterface: state.application.activeInterface
})

export default connect(mapStateToProps)(Main)