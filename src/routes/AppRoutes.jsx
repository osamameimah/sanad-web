import { Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "../components/Admin/Sidebar/Sidebar";
import AdminHome from "../pages/admin/AdminHome/AdminHome";
import Packages from "../pages/admin/Packages/Packages";
import Subscribers from "../pages/admin/Subscribers/Subscribers";
import SubscriptionRequests from "../pages/admin/Requests/Requests";
import WhatsappBoot from "../pages/admin/WhatsappBoot/WhatsappBoot";
// import Login from "../pages/login/Login";
import UserHome from "../pages/user/UserHome/UserHome";
import Sidebar from "../components/User/Sidebar/Sidebar";
import UserVerify from "../pages/user/UserVerify/UserVerify";
import RegisterBills from "../pages/user/RegisterBills/RegisterBills";
import AddBills from "../pages/user/AddBills/AddBills";
import Home from "../pages/home/Home";
import ArchivedInvoices from "../pages/user/ArchivedInvoices/ArchivedInvoices";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/dashboard" element={<AdminLayout />} >
                <Route path="home" element={<AdminHome />} />
                <Route path="Packages" element={<Packages />} />
                <Route path="Subscribers" element={<Subscribers />} />
                <Route path="SubscriptionRequests" element={<SubscriptionRequests />} />
                <Route path="whatsappBoot" element={<WhatsappBoot />} />
            </Route>
 
            {/* <Route path="/user" element={<Sidebar />} >
                <Route path="home" element={<UserHome />} />
                <Route path="registerBills" element={<RegisterBills />} />
                <Route path="archivedInvoices" element={<ArchivedInvoices/>}/>
                <Route path="addBills" element={<AddBills />} />
                <Route path="validation" element={<UserVerify />} />
            </Route> */}

        </Routes>
    );
};

export default AppRoutes;