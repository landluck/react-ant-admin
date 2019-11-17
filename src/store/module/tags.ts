import { IAction } from "../types"
import { Reducer } from "redux"
import { IRoute } from "../../router/config"

export interface TagState {

  breadcrumbs: IRoute[]

  tagViews: IRoute[]
}

const defaults: TagState = {
  breadcrumbs: [
    {
      path: '/',
      meta: {
        title: '首页'
      }
    }
  ],
  tagViews: [
    {
      path: '/',
      meta: {
        title: '首页'
      }
    }
  ]
}

const ADD_TAG_BREADCRUMB = 'ADD_TAG_BREADCRUMB'

const REMOVE_TAG_BREADCRUMB = 'REMOVE_TAG_BREADCRUMB'

const ADD_TAG_VIEW = 'ADD_TAG_VIEW'

const REMOVE_TAG_VIEW = 'REMOVE_TAG_VIEW' 


export const addTagBreadcrumb: (route: IRoute) => IAction<any> = (route: IRoute) => {
  return {
    type: ADD_TAG_BREADCRUMB,
    payload: route
  }
}

export const removeTagBreadcrumb: (route: IRoute) => IAction<any> = (route: IRoute) => {
  return {
    type: ADD_TAG_BREADCRUMB,
    payload: route
  }
}

export const addTagView: (route: IRoute) => IAction<any> = (route: IRoute) => {
  return {
    type: ADD_TAG_VIEW,
    payload: route
  }
}

export const removeTagView: (route: IRoute) => IAction<any> = (route: IRoute) => {
  return {
    type: REMOVE_TAG_VIEW,
    payload: route
  }
}

const tagReducer: Reducer<TagState, IAction<any>> = (state = defaults, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case ADD_TAG_BREADCRUMB:
      
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, payload]
      }

    case REMOVE_TAG_BREADCRUMB:

      return {
        ...state,
        breadcrumb: state.breadcrumbs.filter(item => item.path === payload.path)
      }

    case ADD_TAG_VIEW:
    
      return {
        ...state,
        tagView: [...state.tagViews, payload]
      }

    case REMOVE_TAG_VIEW:

      return {
        ...state,
        tagView: state.tagViews.filter(item => item.path === payload.path)
      }
  
    default:
      return {
        ...state
      }
  }
}

export default tagReducer