import { Tooltip } from "@/components/ui/tooltip";
import { Table } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
    const users=useSelector((state:any)=>state.users.usersList);


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
          {users.map((user: any) => (
            <Table.Row key={user} className="border">
              <Table.Cell className="border p-2">{user.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Users;
