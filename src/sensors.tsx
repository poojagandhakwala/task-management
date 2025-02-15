import {DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';

export const DragDropContainer = () => {

  const mouseSensor = useSensor(MouseSensor); // Initialize mouse sensor
  const touchSensor = useSensor(TouchSensor); // Initialize touch sensor
  const sensors = useSensors(mouseSensor, touchSensor)

  return (<DndContext sensors={sensors}>.....</DndContext>) // Pass the 2 sensors
}