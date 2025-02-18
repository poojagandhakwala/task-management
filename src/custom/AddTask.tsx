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
import { useSelector } from "react-redux";

export default function AddCard({
  addCard,
}: {
  addCard: (title: string, desc: string,user:string) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const users = useSelector((state: any) => state.tasks.taskList)
    .map((item: any) => item.assignee)
    .filter((assignee: any) => assignee !== undefined);
  return (
    <div className="!font-semibold !text-xl !text-left !gap-4 flex flex-col !h-100">
      {/* <Text className="!font-semibold !text-xl !text-left" textAlign="center">
        Task Name
      </Text> */}
      <Input
        type="text"
        // flex="4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Task"
      />
      {/* <Text className="!font-semibold !text-xl !text-left" textAlign="center">
        Description
      </Text> */}
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
            {users
              .filter((item: string) =>
                item.toLowerCase().includes(user.toLowerCase())
              )
              .map((user: string) => (
                <p>{user}</p>
              ))}
            {!users.filter((item: string) =>
              item.toLowerCase().includes(user.toLowerCase())
            ).length && <p>{user}</p>}
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
          addCard(title, desc,user);
        }}
      >
        Add Task
      </Button>
    </div>
  );
}
