import { combineReducers } from 'redux'
import { boardReducer } from './boardReducer'
import { userReducer } from './userReducer'
import { systemReducer } from './systemReducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  boardModule: boardReducer,
  userModule: userReducer
})
