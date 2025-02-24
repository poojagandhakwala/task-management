import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./custom/Sidebar";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const Layout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row !w-screen">
      <div className={`${isOpen && "!w-60"} !h-screen !fixed`}>
        <Sidebar isOpen={isOpen} />
        <div className=" ">
          <BsArrowLeftCircleFill
            className="!text-white !h-8 !w-8 absolute top-2 !left-0"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <div className={`!w-full ${isOpen ? "!ml-60" :"!ml-10"} !h-screen !overflow-y-auto bg-white`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
