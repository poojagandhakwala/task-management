import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import  taskReducer  from "./reducers/tasks/TaskSlice";
import userReducer from "./reducers/users/UserSlice"

const persistConfig={
    key:"root",
    storage,
}
const userPersistConfig = {
    key: "users", // Unique key for users
    storage,
};

const persistedReducer=persistReducer(persistConfig,taskReducer)
const userPersistedReducer=persistReducer(userPersistConfig,userReducer);

export const store=configureStore({
    reducer:{
        tasks: persistedReducer,
        users:userPersistedReducer
    },middleware:(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:["persist/PERSIST","persist/REHYDRATE"]
        }
    })
})

export const persistor=persistStore(store)
