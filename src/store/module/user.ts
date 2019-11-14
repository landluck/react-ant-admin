import { Reducer } from "redux"
import { IAction } from "../types"

export interface UserState {
  token: string
}

const defaultUser: UserState = {
  token: ''
}

const userReducer: Reducer<UserState, IAction<any>>= (state = defaultUser, action: any) => {
  return state
}

export default userReducer