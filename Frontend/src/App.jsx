import { Routes, Route } from "react-router-dom";

import "./App.scss";

import MainLayout from "./Shared/Layout/MainLayout";

import SharedRoutes from "./Shared/Routes/SharedRoutes";



function App() {
  return (
    <Routes>

      {/* Shared Pages */}
      <Route element={<MainLayout />}>
        <Route path="/*" element={<SharedRoutes />} />
      </Route>

    

    </Routes>
  );
}

export default App;