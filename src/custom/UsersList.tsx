import { Tooltip } from "@/components/ui/tooltip";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";


interface UserProps {
  selectedUser:string,
  setSelectedUser:(user:string)=>void;
}
const colorClasses: string[] = [
  "bg-red-800",
  "bg-blue-800",
  "bg-green-800",
  "bg-yellow-800",
  "bg-purple-800",
];

const Users = ({ selectedUser,setSelectedUser }: UserProps) => {

  const users=useSelector((state:any)=>state.users.usersList)

  const userColors = useMemo(() => {
    return users.reduce((acc:Record<string,string>, user:any, index:number) => {
      acc[user.name] = colorClasses[index % colorClasses.length]; 
      return acc;
    }, {});
  }, [users]);

  return (
    <div className="!px-1 !pl-4 flex flex-row gap-1">
      {users.map((user:any,index:number) => {
        // let color = getRandomColor();
        let color=userColors[user.name]
        return (
          <div className={`!mx-0.5`} key={index}>
          <div
            className={`${color} !w-10 !h-10 !p-2 !text-white !rounded-full !capitalize cursor-pointer ${selectedUser===user.name && "!outline-3 !outline-blue-700 rounded-full !outline-offset-3"}`}
            onClick={()=>setSelectedUser(selectedUser!==user.name?user.name:"")}
            
          >
            <Tooltip content={user.name} interactive positioning={{ offset: { mainAxis: 10, crossAxis: 4 } }}
            > 
            <h3>{user?.name[0]}</h3>
            </Tooltip>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
