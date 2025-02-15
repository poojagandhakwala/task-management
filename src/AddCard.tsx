import { Flex, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function AddCard({
  addCard,
}: {
  addCard: (title: string,desc:string) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  return (
    <div>
      <Text className="!font-semibold !text-xl !text-left" textAlign="center">
        Task Name
      </Text>
      <Input
        type="text"
        flex="4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
       <Text className="!font-semibold !text-xl !text-left" textAlign="center">
        Description
      </Text>
        <Textarea
        flex="4"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <Button
        flex="1"
        marginX="3"
        bgColor="blue.400"
        color="white"
        onClick={() => {
          setTitle("");
          setDesc("");
          addCard(title,desc);
        }}
      >
        Add Task
      </Button>
    </div>
  );
}
