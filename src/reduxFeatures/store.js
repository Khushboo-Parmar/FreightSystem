import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./content/contentSlice";
import userReducer from "./content/userReducer";
// import getcomplaintsReducer from "./content/complaintsSlice";
import phoneReducer from './content/phoneSlice'
const store = configureStore({
    reducer:{
        register:registerReducer,
        user: userReducer,
        // complaints: getcomplaintsReducer,
        phone: phoneReducer,

    },
  
});

export default store;