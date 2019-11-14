import { IAction } from "../types"
import { Reducer } from "redux"

export interface Settings {
  sidebarLogo: boolean

  fixedHeader: boolean

  tagsView: boolean
}

const defaults: Settings = {

  sidebarLogo: true,

  fixedHeader: false,

  tagsView: true
}


const SET_SIDE_BAR_OPENED = 'SET_SIDE_BAR_OPENED'



const settingsReducer: Reducer<Settings, IAction<any>> = (state = defaults, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_SIDE_BAR_OPENED:
      
      return {
        ...state,
        fixedHeader: payload
      }
  
    default:
      return {
        ...state
      }
  }
}

export default settingsReducer