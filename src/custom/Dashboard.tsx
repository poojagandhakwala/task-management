import { useSelector } from "react-redux";
import {
  FaTasks,
  FaSpinner,
  FaCheckCircle,
  FaUser,
  FaClock,
  FaPlus,
  FaList,
  FaCheck,
  FaTrash,
} from "react-icons/fa";
import logo from "../assets/image.png"

const Dashboard = () => {
  const { taskList, pending, completed } = useSelector(
    (state: any) => state.tasks
  );

  const userStats = taskList.reduce((acc: any, val: any) => {
    if (!val.assignee) return acc;
    acc[val.assignee] = (acc[val.assignee] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-col w-full h-screen overflow-auto !p-8 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center !mb-6">
        <h4 className="!text-3xl !font-semibold text-gray-800">
          Dashboard Overview{" "}
        </h4>
        <img
          className="h-24 w-24 object-contain"
          src={logo}
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFjY5sci3qZmEkKgPJlHVAl2i0yN4Mc-p4g290hSMXXfb2tRU9me43B5xGgQLdPVV_3o&usqp=CAU"
          alt="logo"
        />
      </div>

      <div className="flex flex-col !gap-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 !gap-6">
          <div className="bg-white !p-6 shadow-sm rounded-lg flex items-center gap-4 border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-100 to-blue-50">
            <FaTasks className="text-blue-500 text-4xl" />
            <div>
              <h4 className="text-md text-gray-600">Total Tasks</h4>
              <p className="text-3xl font-bold text-gray-900">
                {taskList.length}
              </p>
            </div>
          </div>
          <div className="bg-white !p-6 shadow-sm rounded-lg flex items-center gap-4 border-l-4 border-yellow-500 hadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-yellow-100 to-yellow-50">
            <FaSpinner className="text-yellow-500 text-4xl" />
            <div>
              <h4 className="text-md text-gray-600">Pending Tasks</h4>
              <p className="text-3xl font-bold text-gray-900">{pending}</p>
            </div>
          </div>
          <div className="bg-white !p-6 shadow-sm rounded-lg flex items-center gap-4 border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-r from-green-100 to-green-50">
            <FaCheckCircle className="text-green-500 text-4xl" />
            <div>
              <h4 className="text-md text-gray-600">Completed Tasks</h4>
              <p className="text-3xl font-bold text-gray-900">{completed}</p>
            </div>
          </div>
        </div>

        <div className="text-left">
          <p className="text-sm text-gray-700 mt-2">
            {taskList.length > 0
              ? ((completed / taskList.length) * 100).toFixed(0)
              : 0}
            % of tasks completed
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${(completed / taskList.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* User Performance & Recent Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mt-8">
          {/* User Performance */}
          <div className="bg-white !p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUser className="text-blue-500" /> User Performance
              {/* 🏆 */}
            </h3>
            <ul className="mt-3">
              {Object.entries(userStats).map(([user, count]: any) => (
                <li
                  key={user}
                  className="border-b last:border-0 !py-3 flex justify-between text-gray-700"
                >
                  <strong>{user}</strong>
                  <span className="font-medium">
                    {count} tasks completed ✅
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white !p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaClock className="text-gray-600" /> Recent Activity
              {/* 🕒 */}
            </h3>
            <ul className="mt-3">
              {taskList.slice(-5).map((task: any) => (
                <li
                  key={task.id}
                  className="border-b last:border-0 !py-3 flex justify-between text-gray-700"
                >
                  <div>
                    <strong>{task.title}</strong> -{" "}
                    {task.isCompleted ? "Completed ✅" : "Updated"}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(task.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Task Action Buttons */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            {
              text: "Add New Task",
              icon: FaPlus,
              color: "!bg-blue-400 hover:!bg-blue-500",
            },
            {
              text: "View Pending Tasks",
              icon: FaList,
              color: "!bg-yellow-400 hover:!bg-yellow-500",
            },
            {
              text: "Mark Task as Completed",
              icon: FaCheck,
              color: "!bg-green-400 hover:!bg-green-500",
            },
            {
              text: "Clear Completed Tasks",
              icon: FaTrash,
              color: "!bg-red-400 hover:!bg-red-500",
            },
          ].map(({ text, icon: Icon, color }, index) => (
            <button
              key={index}
              className={`flex items-center justify-center gap-3 ${color} text-white !px-6 !py-3 rounded-full transition-transform transform hover:scale-105 text-lg font-medium shadow-md`}
            >
              <Icon className="text-xl" />
              {text}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
