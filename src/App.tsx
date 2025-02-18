import { Spinner, Text } from "@chakra-ui/react";
import "./App.css";
import Sidebar from "./custom/Sidebar";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./custom/Dashboard";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./Layout";
import Analysis from "./custom/Analysis.tsx";
import Users from "./custom/Users.tsx";

const Dashboard = React.lazy(() => import("./custom/Dashboard.tsx"));
const KanbanBoard = React.lazy(() => import("./custom/Tasks/KanbanBoard.tsx"));

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <BrowserRouter>
        {/* <div className="flex !h-full !w-full">
        <div className="!w-1/3 ">
          <Sidebar isOpen={isOpen} />
          <div className="  flex">
            <BsArrowLeftCircleFill
              className="!text-white !h-8 !w-8 absolute top-2 !left-0"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <div className="!mx-5 !align-items-center !w-2/3"> */}

        <React.Suspense
          fallback={
            <div className="flex !justify-center !align-items-center !text-center !h-screen">
              <Spinner className="!text-4xl text-blue-700 !self-center" />
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <>
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/tasks"
                element={
                  
                    <KanbanBoard />
                }
              />
              <Route path="/users" element={<Users/>}/>
              <Route
                path="/analysis"
                element={
                  
                    <Analysis />
                }
              />
              <Route
                path="/*"
                element={
                  <>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      alignItems="center"
                      className="!h-100 !justify-center flex !text-center"
                    >
                      Page Not Found!
                    </Text>
                  </>
                }
              />
            </Route>
          </Routes>
        </React.Suspense>
        {/* </div>
      </div> */}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
