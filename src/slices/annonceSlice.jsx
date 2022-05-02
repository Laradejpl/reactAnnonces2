import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";


const initialState = {
    allAnnonces:[],
    oneAnnonce:{},
};

export const annonceSlice = createSlice({
    name: "annonces",
    initialState,
    reducers: {
       //info d'une annonce
        getOneAnnonce: (state, action) => {
            state.oneAnnonce = action.payload;
        },
        loadUserAnnonces: (state, action)=>{
            state.annonce = action.payload;
        }
    }
});

export const { loadUserAnnonces,getOneAnnonce } = annonceSlice.actions;
//selectors
export const selectAnnonces = state => state.annonce


export default annonceSlice.reducer;