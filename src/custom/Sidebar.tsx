import { FaCloud, FaCogs, FaCompass, FaDropbox, FaIcons, FaServer, FaTasks, FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdAnalytics, MdOutlineAnalytics } from "react-icons/md";

import { CSSTransition } from "react-transition-group";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {

    const menuItems = [
        { title: "Dashboard", icon: RxDashboard },
        { title: "Tasks", icon: FaTasks},
        { title: "Users", icon: FaUsers },
        { title: "Analysis", icon: MdOutlineAnalytics },
      ];

  return (
    <div
    className={`h-screen bg-gray-800 p-4 font-semibold text-white transition-all duration-300 ${
        isOpen ? "w-full lg:w-60 max-lg:w-40" : "w-10 overflow-hidden"
      }`}
    >
   <ul className="flex flex-col gap-4 !pt-16">
        {menuItems.map(item => (
            <li key={item.title} className={`flex ${isOpen ? "!p-4" :"!py-4 !px-2"} gap-4 cursor-pointer hover:bg-gray-600`}>
              <a href={item.title.toLowerCase()} className="flex !items-center !text-center gap-4"> <item.icon/>
                {isOpen && <CSSTransition
                  in={isOpen}
                  timeout={200}
                  classNames={"fade"}
                  unmountOnExit
                >
                  <span>{item.title}</span>
                </CSSTransition> } </a>
            </li>
          )
      )}
      </ul>
      
    </div>
  );
};

export default Sidebar;
