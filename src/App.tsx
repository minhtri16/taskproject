import React from "react";
import TaskPage from "./components/tasks/page";
// import Page from "./app/dashboard/page";
// import ExamplesLayout from "./components/tasks/layout";
// import { ThemeProvider } from "./components/theme-provider";
// import { ModeToggle } from "./components/mode-toggle";
// import AppRoutes from "./AppRoute";
// import { BrowserRouter } from "react-router";
const App: React.FC = () => {
  return (
    <>
    {/* <div className=" h-screen w-screen flex justify-center">     
      {/* <BrowserRouter>
        <AppRoutes />
      </BrowserRouter> */}
    {/* <Page/> */}
    {/* <ExamplesLayout/> */}
    <TaskPage/>
    </>
  );
};
export default App;
