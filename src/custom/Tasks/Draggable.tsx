import {useDraggable} from "@dnd-kit/core"
import {CSS} from "@dnd-kit/utilities"

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable = ({id, children}: DraggableProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  
  return (         
    <div {...attributes}
      {...listeners} 
      ref={setNodeRef} 
      style={{transform: CSS.Transform.toString(transform)}}>
        {children}
    </div>
  );
}