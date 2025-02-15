import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import  taskReducer  from "./reducers/tasks/TaskSlice";

const persistConfig={
    key:"root",
    storage,
}

const persistedReducer=persistReducer(persistConfig,taskReducer)

export const store=configureStore({
    reducer:{
        tasks: persistedReducer
    },middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:["persist/PERSIST","persist/REHYDRATE"]
        }
    })
})

export const persistor=persistStore(store)
