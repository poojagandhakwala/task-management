// import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";

// const Kanban = () => {
//     let data = [
//         { Id: 1, Status: 'Open', Summary: 'Analyze the new requirements gathered from the customer.', Type: 'Story', Priority: 'Low', Tags: 'Analyze,Customer', Estimate: 3.5, Assignee: 'Nancy Davloio', RankId: 1 },
//         { Id: 2, Status: 'InProgress', Summary: 'Fix the issues reported in the IE browser.', Type: 'Bug', Priority: 'Release Breaker', Tags: 'IE', Estimate: 2.5, Assignee: 'Janet Leverling', RankId: 2  },
//         { Id: 3, Status: 'Testing', Summary: 'Fix the issues reported by the customer.', Type: 'Bug', Priority: 'Low', Tags: 'Customer', Estimate: '3.5', Assignee: 'Steven walker', RankId: 1 },
//         { Id: 4, Status: 'Close', Summary: 'Arrange a web meeting with the customer to get the login page requirements.', Type: 'Others', Priority: 'Low', Tags: 'Meeting', Estimate: 2, Assignee: 'Michael Suyama', RankId: 1 },
//         { Id: 5, Status: 'Validate', Summary: 'Validate new requirements', Type: 'Improvement', Priority: 'Low', Tags: 'Validation', Estimate: 1.5, Assignee: 'Robert King', RankId: 1 }
//     ];
//     return (
//             <div className="App">
//                 <KanbanComponent id="kanban" keyField="Status" dataSource={data} cardSettings={{ contentField: "Summary", headerField: "Id" }}>
//                     <ColumnsDirective>
//                     <ColumnDirective headerText="To Do" keyField="Open"/>
//                     <ColumnDirective headerText="In Progress" keyField="InProgress"/>
//                     <ColumnDirective headerText="Testing" keyField="Testing"/>
//                     <ColumnDirective headerText="Done" keyField="Close"/>
//                     </ColumnsDirective>
//                 </KanbanComponent>
//             </div>
//           );
// };
// export default Kanban;

import { Button, CloseButton, Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { removeTask } from "./Redux/reducers/tasks/TaskSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";

const KanbanCard = ({
  title,
  index,
  desc,
  parent,
}: {
  title: string;
  index: number;
  desc: string;
  parent: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      desc,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const dispatch = useDispatch();
  return (
    // <Flex
    //   flexDirection="row"
    //   padding="3"
    //   backgroundColor="white"
    //   margin="2"
    //   borderRadius="8"
    //   border="2px solid gray.500"
    //   boxShadow="0px 0px 5px 2px #2121213b"
    //   transform={style.transform}
    //   {...listeners}
    //   {...attributes}
    //   ref={setNodeRef}
    // >
    //   <div className="relative !flex">
    //   <CloseButton className="!absolutetop-2!right-10"/>
    //   </div>
    //   <div>
    //   <Text>{title}</Text>
    //   <br/>
    //   <Text>{desc}</Text>
    //   </div>
    // </Flex>
    <div>
      <div
        className="flex flex-row !relative bg-gray-100 !rounded-xl !m-3 !p-2 !py-3 !overflow-y-auto box-shadow shadow shadow-[0px_0px_5px_2px #2121213b]"
        style={{ transform: style.transform }}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        <div
          draggable={false}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute  !top-0 !right-0"
        >
          <FaWindowClose
            className="!text-xl flex cursor-pointer"
            role="button"
            onClick={() => {
              dispatch(removeTask(index));
              toast.error("Task Deleted Successfully!",{id:index.toString()});
            }}
          />
        </div>

        {/* </div> */}
        <div className="flex flex-col !text-start !w-full">
          {" "}
          <div className="!my-2">
            <h5>Title: {title}</h5>
          </div>
          <div className="!my-2">
            <h5>Description: {desc}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KanbanCard;
