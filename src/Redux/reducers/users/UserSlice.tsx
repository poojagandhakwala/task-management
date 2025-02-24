import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}
const users: User[] = [
  { id: 0, name: "User 1" },
  { id: 1, name: "User 2" },
];
const initialState = { usersList: users };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList.push(action.payload);
    },
    removeUser: (state, action) => {
      state.usersList = state.usersList.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
