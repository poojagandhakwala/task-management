// KanbanLane.tsx
import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./Kanban"
import { Cards } from "../../types";
interface KanbanLaneProps {
  title: string;
  items: Cards[];
}

export default function KanbanLane({ title, items }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <Flex  padding="5" flexDirection="column" minH="25rem" minW="12rem"  className="!w-full !max-w-full" >
      <Text fontWeight="bold" className="!text-black">{title}</Text>
      <Flex
        ref={setNodeRef}
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        {items.map((item, key) => (
          <KanbanCard 
            title={item.title} 
            desc={item.desc} 
            key={key} 
            index={item.id} 
            parent={title} 
            user={item.assignee}
          />
        ))}
      </Flex>
    </Flex>
  );
}