import { AppStateInterface } from '../types/Application'
import { AppActionTypes } from '../types/actions'

const initialAppState: AppStateInterface ={
  activeInterface: "dashboard"
}

export const appReducer = (state = initialAppState, action: AppActionTypes): AppStateInterface => {
  switch (action.type) {
    case "SET_APP_INTERFACE":
      return {
        ...state,
        activeInterface: action.activeInterface
      }
    default:
      return state;
  }
};
