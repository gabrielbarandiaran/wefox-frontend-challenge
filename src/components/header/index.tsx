import React from 'react'
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { startSetAppInterface } from 'redux/actions/application'
import { AppState } from 'redux/store/configureStore';
import { AppActions } from 'redux/types/actions';
// Images
import logo from 'assets/images/logo/logo192.png'

interface HeaderProps {
  activeInterface?: "dashboard" | "postDetail" | "addPost"
}

type Props = HeaderProps & LinkDispatchProps & LinkStateProps;



const Header: React.FC<Props> = (props) => {

  const handleClick = () => {
    props.startSetAppInterface("dashboard");
  }

  return(
    <>
    <nav>
      <img src={logo} alt="Logo" />
    </nav>
      <h1
        onClick={() => handleClick()}>
        Add
      </h1>
      </>
  )
}

interface LinkStateProps {
  activeInterface?: "dashboard" | "postDetail" | "addPost"
}
 
interface LinkDispatchProps {
  startSetAppInterface: (activeInterface: "dashboard" | "postDetail" | "addPost") => void;
}

const mapStateToProps = (state: AppState, props: HeaderProps): LinkStateProps => ({
  activeInterface: state.application.activeInterface
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, props: HeaderProps): LinkDispatchProps => ({
  startSetAppInterface: bindActionCreators(startSetAppInterface, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);