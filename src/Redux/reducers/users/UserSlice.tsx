import { createSlice } from "@reduxjs/toolkit";

interface User{
    id:number,
    name:string
}
const initialState = { usersList: [] as User[] };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser:(state,action)=>{
        state.usersList.push(action.payload)
    },
    removeUser:(state,action)=>{
        state.usersList=state.usersList.filter((user)=>user.id!==action.payload)
    }
  },
});


export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer;