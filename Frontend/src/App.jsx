import { Routes, Route } from "react-router-dom";
import MainLayout from "./Shared/Layout/MainLayout";
import SharedRoutes from "./Shared/Routes/SharedRoutes";

import "./App.scss"

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/*" element={<SharedRoutes />} />
      </Route>

    </Routes>
  );
}

export default App;