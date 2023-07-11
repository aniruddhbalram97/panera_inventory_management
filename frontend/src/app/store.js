import { configureStore } from '@reduxjs/toolkit'
import  uiReducer  from './uiReducer'
import dataReducer from './dataReducer'
export default configureStore({
  reducer: 
  {
    uiReducer:uiReducer,
    dataReducer:dataReducer,
  },
})