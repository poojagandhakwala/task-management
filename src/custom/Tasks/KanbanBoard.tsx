// KanbanBoard.tsx
import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane.tsx";
import AddCard from "../AddTask.tsx";
import { Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Cards } from "../../types.tsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  inProgessTask,
  todoTask,
} from "../../Redux/reducers/tasks/TaskSlice.tsx";
import Users from "../UsersList.tsx";

export default function KanbanBoard() {

  // const users = useSelector((state: any) => state.users.usersList || []);

  const todoItems =
    useSelector((state: any) =>
      state.tasks.taskList.filter((item: any) => item.isPending === true)
    ) || [];
  const doneItems =
    useSelector((state: any) =>
      state.tasks.taskList.filter((item: any) => item.isCompleted === true)
    ) || [];
  const inProgressItems =
    useSelector((state: any) =>
      state.tasks.taskList.filter((item: any) => item.inProgress === true)
    ) || [];
  const [uItems, setuItems] = useState<Array<Cards>>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [selectedUser,setSelectedUser]=useState<string>("");

  const handleSelectedUser=useCallback((user:string)=>{
    setSelectedUser(user)
  },[])

  const addNewCard = (title: string, desc: string, user:string) => {
    if (!title || !desc) {
      toast("Please add Title and Description!", { icon: "⚠️" });
    } else {
      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => {
            dispatch(
              addTask({
                id: 0,
                title,
                desc,
                isPending: true,
                inProgress: false,
                isCompleted: false,
                createdAt: new Date().toISOString(),
                assignee: user,
              })
            );
            resolve("Task added");
          }, 1000)
        ),
        {
          loading: "Adding...",
          success: "Task added successfully",
          error: "Error while adding task!",
        }
      );
    } 
  };
  // console.log("user = ",users)
  return (
    <div className="!p-4 !px-8 !w-full flex flex-col !overflow-x-hidden">
      <Text fontSize="2xl" padding="5" fontWeight="bold">
        Task Board
      </Text>
      <div className="flex max-lg:flex-col flex-row !w-full !px-2 !mt-4 !gap-x-8">
        <div className="!w-3/4">
          <Users  selectedUser={selectedUser} setSelectedUser={handleSelectedUser} />
          <DndContext
            collisionDetection={rectIntersection}
            onDragMove={() => {
              setIsDragging(true);
            }}
            onDragEnd={(e) => {
              if (!isDragging) return; // Prevent execution if the user only clicked
              setIsDragging(false);
              const container = e.over?.id;
              if (!container) return;
              const title = e.active.data.current?.title ?? "";
              const desc = e.active.data.current?.desc ?? "";
              const index = e.active.data.current?.index ?? 0;
              const parent = e.active.data.current?.parent ?? "ToDo";
              // //Adding item to new container
              if (container === "ToDo") {
                dispatch(todoTask(index));
              } else if (container === "Done") {
                dispatch(completeTask(index));
              }
              // else if (container === "Unassigned") {
              //   setuItems([...uItems, { title, desc }]);
              // } else
              else {
                dispatch(inProgessTask(index));
              }
            }}
          >
            <Flex flexDirection="row">
            <Flex flex="2">
              <KanbanLane title="ToDo" items={todoItems.filter((item:any)=>selectedUser?item.assignee===selectedUser:item)} />
              <KanbanLane title="In Progress" items={inProgressItems.filter((item:any)=>selectedUser?item.assignee===selectedUser:item)} />
              <KanbanLane title="Done" items={doneItems.filter((item:any)=>selectedUser?item.assignee===selectedUser:item)} />
              {/* <KanbanLane title="Unassigned" items={uItems} /> */}
            </Flex>
            </Flex>
          </DndContext>
        </div>
        <div className="!w-1/4 !max-w-full !h-full !mt-5">
          {" "}
          <AddCard addCard={addNewCard} />{" "}
        </div>
      </div>
    </div>
  );
}
