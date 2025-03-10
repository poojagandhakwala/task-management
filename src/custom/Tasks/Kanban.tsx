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
import { removeTask } from "../../Redux/reducers/tasks/TaskSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";

const KanbanCard = ({
  title,
  index,
  desc,
  parent,
  user,
}: {
  title: string;
  index: number;
  desc: string;
  parent: string;
  user: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      desc,
      index,
      parent,
      user,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const dispatch = useDispatch();
  return (
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
              toast.error("Task Deleted Successfully!", {
                id: index.toString(),
              });
            }}
          />
        </div>

        {/* </div> */}
        <div className="flex flex-col !text-start !w-full !text-black">
          <div className="flex  !item-end !justify-end !mt-2 absolute !right-2 ">
            {user && (
              <div
                className={`bg-gray-700 !w-10 !h-10 !p-2 !text-white !rounded-full !capitalize !text-center relative !self-end !justify-end`}
                // onClick={()=>setSelectedUser(selectedUser!==user?user:"")}
              >
                <h3 className="!text-white">{user[0]}</h3>{" "}
              </div>
            )}
          </div>{" "}
          <div className="!my-2">
            <h5 className="!text-black">Title: {title}</h5>
          </div>
          <div className="!my-2">
            <h5 className="!text-black">Description: {desc}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KanbanCard;
