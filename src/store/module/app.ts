import { IAction } from "../types"
import { Reducer } from "redux"
import { IRoute } from "../../router/config"
import { routes } from '../../router/sidebar'

export interface AppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }

  device: string

  size: string

  routes: IRoute[]
}

const defaultApp: AppState = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },

  device: 'desktop',

  size: 'small',
  routes: routes
}


const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED'

export const updateSideBar = (sidebar: AppState['sidebar']) => ({
  type: SET_SIDE_BAR_OPENED,
  payload: sidebar
})


const appReducer: Reducer<AppState, IAction<any>> = (state = defaultApp, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      
      return {
        ...state,
        sidebar: payload
      }
  
    default:
      return {
        ...state
      }
  }
}

export default appReducer