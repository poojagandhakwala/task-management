// KanbanBoard.tsx
import { DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane.tsx";
import AddCard from "./AddCard.tsx";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Cards } from "./types.tsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  inProgessTask,
  todoTask,
} from "./Redux/reducers/tasks/TaskSlice.tsx";

export default function KanbanBoard() {
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

  const addNewCard = (title: string, desc: string) => {
    // setuItems([
    //   ...uItems,
    //   { id:0,title, desc, isPending: true, inProgress: false, isCompleted: false },
    // ]);
    if (!title || !desc) {
      toast("Please add Title and Description!", { icon: "⚠️" });
    } else {
      toast.promise(
        new Promise((resolve) =>
            setTimeout(()=>{dispatch(
              addTask({
                id: 0,
                title,
                desc,
                isPending: true,
                inProgress: false,
                isCompleted: false,
                createdAt: new Date(),
              })
            
            )
            resolve("Task added")
          },1000
          )
        ),
        {
          loading: "Adding...",
          success: "Task added successfully",
          error: "Error while adding task!",
        }
      );
    }
  };

  return (
    <div className="!p-4 !w-full flex flex-col !overflow-x-hidden">
      <Text fontSize="2xl" padding="5" fontWeight="bold" fontStyle="italic">
        Simple Kanban
      </Text>
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

          //removing item from old container
          //  if (parent === "ToDo") {
          // setTodoItems([
          //   ...todoItems.slice(0, index),
          //   ...todoItems.slice(index + 1),
          // ]);
          // } else if (parent === "Done") {
          //   setDoneItems([
          //     ...doneItems.slice(0, index),
          //     ...doneItems.slice(index + 1),
          //   ]);
          // } else if (parent === "Unassigned") {
          //   console.log("in unassigned");
          //   setuItems(uItems.filter((_, i) => i !== index));
          // } else {
          //   setInProgressItems([
          //     ...inProgressItems.slice(0, index),
          //     ...inProgressItems.slice(index + 1),
          //   ]);
          // }

          // //Adding item to new container
          if (container === "ToDo") {
            // setTodoItems([...todoItems, { title, desc }]);
            dispatch(todoTask(index));
          } else if (container === "Done") {
            // dispatch(completeTask());
            // setDoneItems([...doneItems, { title, desc }]);
            dispatch(completeTask(index));
          }
          // else if (container === "Unassigned") {
          //   setuItems([...uItems, { title, desc }]);
          // } else
          else {
            // console.log("in progress");
            // setInProgressItems([...inProgressItems, { title, desc }]);
            dispatch(inProgessTask(index));
          }
        }}
      >
        <Flex flexDirection="column">
          <AddCard addCard={addNewCard} />
          <Flex flex="3">
            <KanbanLane title="ToDo" items={todoItems} />
            <KanbanLane title="In Progress" items={inProgressItems} />
            <KanbanLane title="Done" items={doneItems} />
            <KanbanLane title="Unassigned" items={uItems} />
          </Flex>
        </Flex>
      </DndContext>
    </div>
  );
}
