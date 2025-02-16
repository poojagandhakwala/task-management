import { Table } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  DefaultLegendContent,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Charts = () => {
  const taskData = useSelector((state: any) => state.tasks.taskList) || [];

  const taskDataSample = [
    {
      id: 0,
      title: "t1",
      desc: "d1",
      isPending: false,
      inProgress: true,
      isCompleted: false,
    },
    {
      id: 1,
      title: "t2",
      desc: "d2",
      isPending: false,
      inProgress: false,
      isCompleted: true,
    },
    {
      id: 2,
      title: "tt2",
      desc: "dd2",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-12T08:15:31.044Z",
    },
    {
      id: 3,
      title: "432",
      desc: "ewr",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-16T08:30:36.882Z",
    },
    {
      id: 4,
      title: "poeq",
      desc: "pwr",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-16T08:30:59.188Z",
    },
    {
      id: 5,
      title: "qw",
      desc: "we",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-11T08:31:26.684Z",
    },
    {
      id: 6,
      title: "wwe",
      desc: "we",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-14T08:33:25.636Z",
    },
    {
      id: 7,
      title: "t123",
      desc: "eqwy",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-16T08:33:49.030Z",
    },
    {
      id: 8,
      title: "erer",
      desc: "ewr",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-20T08:34:16.027Z",
    },
    {
      id: 9,
      title: "re",
      desc: "ewy",
      isPending: true,
      inProgress: false,
      isCompleted: false,
      createdAt: "2025-02-16T08:54:08.698Z",
    },
  ];

  const [filter, setFilter] = useState("all");
  const processedData = useMemo(() => {
    return taskData
      .filter((item: any) => {
        if (filter === "all" || !filter) {
          return true; // Show all tasks
        } else if (filter === "pending") {
          return item.isPending === true;
        } else if (filter === "inProgress") {
          return item.inProgress === true;
        } else if (filter === "completed") {
          return item.isCompleted === true;
        }
        return false;
      })
      .map((task: any) => {
        if (!task.createdAt) return null;
        const createdAt = new Date(task.createdAt);
        const current = new Date();

        const time = current.getTime() - createdAt?.getTime();
        const hours = (time / (1000 * 60 * 60)).toFixed(2);

        return {
          title: task.title,
          hours: parseFloat(hours),
        };
      })
      .filter(Boolean);
  }, [taskData,filter]);

  const min = Math.min(...processedData.map((item: any) => item?.time));
  const max = Math.max(...processedData.map((item: any) => item?.time));

  return (
    <div className="!h-100">
      <h4 className="!text-2xl !font-semibold !p-3 !w-full !text-center">
        Task Performance Tracker 🚀
      </h4>
      <div className="flex flex-row max-lg:flex-col !w-full !items-center">
        <div className="!my-3 !p-3 !h-full">
          <div className="!items-end">
            <select
              className="border p-2 rounded"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineChart
            width={700}
            height={600}
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis
              domain={[Math.floor(min * 0.5), Math.ceil(max * 0.5)]}
              tickCount={10}
              allowDataOverflow={false}
              label={{
                value: "Time Taken (Hours)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="right"
              className="!capitalize"
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
          {/* </ResponsiveContainer> */}
        </div>

        <div className="flex flex-col max-lg:flex-row justify-center">
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-blue-100 p-4 rounded-lg h-40 w-40 text-center justify-center flex flex-col">
              <h3 className="text-lg font-semibold">Total Tasks</h3>
              <p className="text-xl">{taskData.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg  h-40 w-40 text-center justify-center flex flex-col">
              <h3 className="text-lg font-semibold">Avg. Time Taken</h3>
              {/* <p className="text-xl">{(totalHours / taskData.length).toFixed(2)} hours</p> */}
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg  h-40 w-40 text-center justify-center flex flex-col">
              <h3 className="text-lg font-semibold">Longest Task</h3>
              <p className="text-xl">{max} hours</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg  h-40 w-40 text-center justify-center flex flex-col">
              <h3 className="text-lg font-semibold">Shortest Task</h3>
              <p className="text-xl">{min.toFixed(2)} hours</p>
            </div>
          </div>
        </div>
      </div>
      <div className="!m-5">
      {/* <Table.ScrollArea borderWidth="1px" rounded="md" height="260px"> */}

      <Table.Root size="sm" striped className="!w-full border-collapse border">
      <Table.Header>
      <Table.Row bg="bg.subtle">
      <Table.ColumnHeader>Task</Table.ColumnHeader>
          <Table.ColumnHeader>Created At</Table.ColumnHeader>
          <Table.ColumnHeader>Status</Table.ColumnHeader>
          <Table.ColumnHeader >Description</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {/* <table className="min-w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Task</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody> */}
          {taskData.map((task: any) => (
            <Table.Row key={task.title} className="border">
              <Table.Cell className="border p-2">{task.title}</Table.Cell>
              <Table.Cell className="border p-2">
                {new Date(task?.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell className="border p-2">
                {task.isCompleted ? "Completed" : "Pending"}
              </Table.Cell>
              <Table.Cell className="border p-2">{task.desc}</Table.Cell>
             
            </Table.Row>
          ))}
          </Table.Body>
          </Table.Root>
          {/* </Table.ScrollArea> */}
        {/* </tbody>
      </table> */}
      </div>
    </div>
  );
};

export default Charts;
