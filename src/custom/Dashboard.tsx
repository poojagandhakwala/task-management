import { useSelector } from "react-redux";

const Dashboard = () => {
  const { taskList, pending, completed } = useSelector(
    (state: any) => state.tasks
  );

  return (
    <div className="flex flex-col !w-full !h-screen">
      <h4 className="!text-2xl !font-semibold !py-8 !w-full !text-center">
        Dashboard
      </h4>
      <div className="!justify-center flex mt-5">
        {" "}
        <img
          className="h-20 w-20 lg:h-40 lg:w-40 absolute !top-0 right-0 lg:right-10 !object-contain"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFjY5sci3qZmEkKgPJlHVAl2i0yN4Mc-p4g290hSMXXfb2tRU9me43B5xGgQLdPVV_3o&usqp=CAU"
          alt="logo"
        />
      </div>
      <div className="flex flex-row gap-4 !align-items-center !justify-center !mt-12 !p-4 ">
        <div className="bg-gray-800 text-white m-2  flex flex-col justify-center align-center p-4 w-96 h-60 rounded-lg my-5 !mt-16">
          <h4 className="!font-semibold !text-xl ">
            Total Tasks = {taskList?.length}
          </h4>
        </div>
        <div className="bg-gray-800 text-white m-2  flex flex-col justify-center align-center p-4 w-96 h-60 rounded-lg my-5 !mt-16">
          <h4 className="!font-semibold !text-xl ">
            Pending Tasks = {pending}
          </h4>
        </div>
        <div className="bg-gray-800 text-white m-2  flex flex-col justify-center align-center p-4 w-96 h-60 rounded-lg my-5 !mt-16">
          <h4 className="!font-semibold !text-xl ">
            Completed Tasks = {completed}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
