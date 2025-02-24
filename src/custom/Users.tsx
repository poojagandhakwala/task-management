import { Tooltip } from "@/components/ui/tooltip";
import { Table } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state: any) => state.users.usersList);
  const taskData = useSelector((state: any) => state.tasks.taskList) || [];

  return (
    <div className="!p-4 flex flex-row gap-1">
      <Table.Root size="sm" striped className="!w-full border-collapse border">
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Assigned Tasks</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user: any) => {
            const assignedTask = taskData.filter(
              (tasks: any) => tasks.assignee === user.name
            );
            return (
              <Table.Row
                key={user}
                className="border hover:!bg-gray-100 !transition-all"
              >
                <Table.Cell className="border p-2">{user.name}</Table.Cell>
                <Table.Cell className="border p-2">
                  {assignedTask.length > 0 ? (
                    <ul className="!list-disc !pl-4">
                      {assignedTask.map((task: any) => (
                        <li key={task.id}>{task.title}</li>
                      ))}
                    </ul>
                  ) : (
                    "No tasks assigned"
                  )}{" "}
                </Table.Cell>
                <Table.Cell className="border p-2">
                  {" "}
                  {assignedTask && (
                    <ul className="!list-disc !pl-4">
                      {assignedTask.map((task: any) =>
                       <li>{task.isCompleted ? "Complted" : "Pending"}</li>
                      )}
                    </ul>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Users;
