import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  desc: string;
  isPending: boolean;
  inProgress: boolean;
  isCompleted: boolean;
}

const initialState = {
  taskList: [] as Task[],
  pending: 0,
  completed: 0,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      action.payload.id =  state.taskList.length ;
      state.taskList.push(action.payload);
      state.pending = state.pending + 1;
    },
    todoTask:(state,action:PayloadAction<number>)=>{
        const taskItem=state.taskList.find((item)=>item.id===action.payload);
        if(taskItem){
            taskItem.isPending=true;
            taskItem.inProgress=false;
            taskItem.isCompleted=false;
        }
      state.pending= state.taskList.filter((item)=>item.isPending).length  ;
      state.completed =state.taskList.filter((item)=>item.isCompleted).length;

    },
    inProgessTask: (state, action: PayloadAction<number>) => {
      const taskItem =
        state.taskList.find((task) => task.id === action.payload) || null;
      if (taskItem) {
        taskItem.isPending=false;
        taskItem.inProgress = true;
        taskItem.isCompleted=false;
      }
    },
    completeTask: (state,action:PayloadAction<number>) => {
        const taskItem =
        state.taskList.find((task) => task.id === action.payload) || null;
      if (taskItem) {
        taskItem.isCompleted=true;
        taskItem.inProgress = false;
        taskItem.isPending=false;
      }
      state.pending=state.pending>0 ? state.taskList.filter((item)=>item.isPending).length :0 ;
      state.completed =state.taskList.filter((item)=>item.isCompleted).length;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const { addTask, todoTask, inProgessTask, completeTask, removeTask } =
  taskSlice.actions;
export default taskSlice.reducer;
