import { Routes, Route } from "react-router-dom";
import Chat from "../Pages/BuyerChat/Chat";



const BuyerRoutes = () => {
    return (
        <Routes>

            {/* <Route
                path="dashboard"
                element={<BuyerDashboard />}
            /> */}

            <Route
                path="chat/:chatId"
                element={<Chat />}
            />

        </Routes>
    );
};

export default BuyerRoutes;