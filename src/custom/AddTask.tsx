import { addTask } from "@/Redux/reducers/tasks/TaskSlice";
import { addUser } from "@/Redux/reducers/users/UserSlice";
import {
  Flex,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddTask({
  addCard,
}: {
  addCard: (title: string, desc: string,user:string) => void;
}) {
  const tasks=useSelector((state:any)=>state.tasks.taskList)
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const users = useSelector((state: any) => state.users.usersList);

  const dispatch=useDispatch(); 

  const addNewTask = (title: string, desc: string, user:string) => {
    if (!title || !desc) {
      toast("Please add Title and Description!", { icon: "⚠️" });
    } else {
      // if user not exist then add user
      const existingUser=users.filter((item:Record<string,string>)=>item.name.toLowerCase().includes(user.toLowerCase()))
      if(existingUser.length===0){
        dispatch(addUser({id:users.length,name:user}))
      }
      toast.promise(
        new Promise((resolve) =>
          setTimeout(() => {
            dispatch(
              addTask({
                id: tasks.length,
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
    // else{
    //   console.log("in else payload = ", users.length,user)
    //   dispatch(addUser({id:users.length,name:user}))

    //   toast.promise(
    //     new Promise((resolve) =>
    //       setTimeout(() => {
    //         dispatch(
    //           addTask({
    //             id: tasks.length,
    //             title,
    //             desc,
    //             isPending: true,
    //             inProgress: false,
    //             isCompleted: false,
    //             createdAt: new Date().toISOString(),
    //             assignee: user,
    //           })
    //         );
    //         resolve("Task added");
    //       }, 1000)
    //     ),
    //     {
    //       loading: "Adding...",
    //       success: "Task added successfully",
    //       error: "Error while adding task!",
    //     }
    //   );
    // }
    
  };


  return (
    <div className="!font-semibold !text-xl !text-left !gap-4 flex flex-col !h-100 !w-full">
      <h4>Add New Task</h4>
      <Input
        type="text"
        // flex="4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Task"
      />
      <Textarea
        // flex="4"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        placeholder="Description"
      />
      <PopoverRoot
        positioning={{ sameWidth: true }}
        initialFocusEl={() => Input}
      >
        <PopoverTrigger autoFocus={false} asChild>
          <Input
            type="text"
            // flex="4"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            placeholder="Assignee..."
          />
        </PopoverTrigger>
        <PopoverContent width="auto" className="!w-full">
          <PopoverArrow />
          <PopoverBody>
            {users.map((user:any,index:number) => (
                <p key={index}>{user.name}</p>
              ))}
            {/* {!users.filter((item: string) =>
              item.includes(user.toLowerCase())
            ).length && <p>{user}</p>} */}
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>

      <Button
        marginX="3"
        bgColor="blue.400"
        color="white"
        onClick={() => {
          setTitle("");
          setDesc("");
          setUser("")
          addNewTask(title,desc,user)
        }}
      >
        Add Task
      </Button>
    </div>
  );
}
