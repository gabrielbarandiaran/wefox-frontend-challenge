import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startSetPosts } from 'redux/actions/post'
import { Post } from 'redux/types/Post';
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';

interface DashboardProps {
  posts: Post[]
}

type Props = DashboardProps & LinkDispatchProps & LinkStateProp;

const Dashboard: React.FC<Props> = (props) => {

  useEffect(() => {
    props.startSetPosts();
  });

  return(
    <section>
      <p>helooo
      </p>
    </section>
  )
}

interface LinkStateProp {
 posts: Post[]
}

interface LinkDispatchProps {
  startSetPosts: () => void;
}

const mapStateToProps = (state: AppState, props: DashboardProps): LinkStateProp => ({
  posts: state.posts.posts
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: DashboardProps): LinkDispatchProps => ({
  startSetPosts: bindActionCreators(startSetPosts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);