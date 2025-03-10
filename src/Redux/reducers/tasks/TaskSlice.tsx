import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  desc: string;
  isPending: boolean;
  inProgress: boolean;
  isCompleted: boolean;
  createdAt: string;
  assignee: string;
}

const sampleTask:Task[] = [
  {
    id: 0,
    title: "Task 1",
    desc: "Description of Task 1",
    isPending: true,
    inProgress: false,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    assignee: "User 1",
  },
  {
    id: 1,
    title: "Task 2",
    desc: "Description of Task 2",
    isPending: true,
    inProgress: false,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    assignee: "User 2",
  },
];

const initialState = {
  taskList:sampleTask,
  pending: 2,
  completed: 0,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      // action.payload.id =  state.taskList.length ;
      // action.payload.createdAt=new Date();
      state.taskList.push(action.payload);
      state.pending = state.pending + 1;
    },
    todoTask: (state, action: PayloadAction<number>) => {
      const taskItem = state.taskList.find(
        (item) => item.id === action.payload
      );
      if (taskItem) {
        taskItem.isPending = true;
        taskItem.inProgress = false;
        taskItem.isCompleted = false;
      }
      state.pending = state.taskList.filter((item) => item.isPending).length;
      state.completed = state.taskList.filter(
        (item) => item.isCompleted
      ).length;
    },
    inProgessTask: (state, action: PayloadAction<number>) => {
      const taskItem =
        state.taskList.find((task) => task.id === action.payload) || null;
      if (taskItem) {
        taskItem.isPending = false;
        taskItem.inProgress = true;
        taskItem.isCompleted = false;
      }
    },
    completeTask: (state, action: PayloadAction<number>) => {
      const taskItem =
        state.taskList.find((task) => task.id === action.payload) || null;
      if (taskItem) {
        taskItem.isCompleted = true;
        taskItem.inProgress = false;
        taskItem.isPending = false;
      }
      state.pending =
        state.pending > 0
          ? state.taskList.filter((item) => item.isPending).length
          : 0;
      state.completed = state.taskList.filter(
        (item) => item.isCompleted
      ).length;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      const taskItem = state.taskList.find((task) => task.id === action.payload) || null;
      if(taskItem?.isPending){
        state.pending-=1;
      }
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const { addTask, todoTask, inProgessTask, completeTask, removeTask } =
  taskSlice.actions;
export default taskSlice.reducer;
