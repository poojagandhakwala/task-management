import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./custom/Sidebar";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const Layout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-row !w-screen">
      <div className="!w-40 !h-screen !fixed">
        <Sidebar isOpen={isOpen} />
        <div className=" ">
          <BsArrowLeftCircleFill
            className="!text-white !h-8 !w-8 absolute top-2 !left-0"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <div className="!w-full !ml-40 !h-screen !overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
