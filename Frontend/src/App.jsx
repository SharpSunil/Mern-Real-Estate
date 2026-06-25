import { Routes, Route } from "react-router-dom";

import "./App.scss";

import MainLayout from "./Shared/Layout/MainLayout";

import SharedRoutes from "./Shared/Routes/SharedRoutes";
import BuyerRoutes from "./Buyer/BuyerRoutes/BuyerRoutes";



function App() {
  return (
    <Routes>

      {/* Shared Pages */}
      <Route element={<MainLayout />}>
        <Route path="/*" element={<SharedRoutes />} />
      </Route>

      {/* Buyer */}
      <Route path="/buyer/*" element={<BuyerRoutes />} />

      {/* Seller */}
      {/* <Route path="/seller/*" element={<SellerRoutes />} /> */}

      {/* Admin */}
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}

    </Routes>
  );
}

export default App;