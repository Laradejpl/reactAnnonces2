import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import annonceReducer from './annonceSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    annonce: annonceReducer
    
  }
})

export default store;