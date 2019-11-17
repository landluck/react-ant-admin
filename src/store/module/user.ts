import { Reducer } from "redux"
import { IAction } from "../types"

export interface UserState {
  token: string
  avatar: string | undefined
  account: string
  mobile: string
  role: number
  id: number
}

const defaultUser: UserState = {
  token: '',
  avatar: undefined,
  account: '',
  mobile: '',
  role: 0,
  id: 0
}

const SET_USER_INFO = 'SET_USER_INFO'

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => {
  return {
    type: SET_USER_INFO,
    payload: user
  }
}


const userReducer: Reducer<UserState, IAction<any>>= (state = defaultUser, action: IAction<any>) => {

  const { type, payload } = action

  switch (type) {
    case SET_USER_INFO:
      
      return {
        ...payload
      }
  }
  return state
}

export default userReducer