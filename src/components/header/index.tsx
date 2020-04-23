import React from 'react'
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startSetAppInterface } from 'redux/actions/application'
import { startSetEmptyPost } from 'redux/actions/post'
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
// Material-UI
import AddIcon from '@material-ui/icons/Add';
// Images
import logo from 'assets/images/logo/logo192.png';

interface HeaderProps {
  activeInterface?: "dashboard" | "postDetail" | "addEditPost"
}

type Props = HeaderProps & LinkDispatchProps & LinkStateProps;



const Header: React.FC<Props> = (props) => {

  const handleClick = () => {
    props.startSetEmptyPost();
    props.startSetAppInterface("addEditPost");
  }

  return(
    <nav>
      <div className="navBar">
        <img src={logo} alt="Logo" />
      </div>
      <button className="navAddPostBtn" onClick={() => handleClick()}>
        <AddIcon fontSize="large" />
      </button>
    </nav>
  )
}

interface LinkStateProps {
  activeInterface?: "dashboard" | "postDetail" | "addEditPost"
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addEditPost") => void;
  startSetEmptyPost: () => void;
}

const mapStateToProps = (state: AppState, props: HeaderProps): LinkStateProps => ({
  activeInterface: state.application.activeInterface
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: HeaderProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch),
  startSetEmptyPost: bindActionCreators(startSetEmptyPost, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);