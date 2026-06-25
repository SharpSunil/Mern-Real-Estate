import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Header/Navbar";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop";


const MainLayout = () => {
    return (
        <>
            <ScrollToTop />

            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

export default MainLayout;