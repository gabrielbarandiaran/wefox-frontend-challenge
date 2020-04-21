import { Dispatch } from 'redux'
import { AppActions } from '../types/actions'
import { AppState } from "../store/configureStore";


const setAppInterface = (activeInterface: "dashboard" | "postDetail"): AppActions => ({
  type: "SET_APP_INTERFACE",
  activeInterface
});

export const startSetAppInterface = ( activeInterface: "dashboard" | "postDetail" ) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(setAppInterface(activeInterface));
  };
};