import { Reducer } from "redux"
import { IAction } from "../types"

export interface UserState {
  token: string
  avatar: string | null
}

const defaultUser: UserState = {
  token: '',
  avatar: null
}

const userReducer: Reducer<UserState, IAction<any>>= (state = defaultUser, action: any) => {
  return state
}

export default userReducer