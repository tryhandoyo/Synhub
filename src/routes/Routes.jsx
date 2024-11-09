import { Routes, Route } from "react-router-dom";

//import halaman customer
import LandingPage from "../pages/Customer/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/Customer/HomePage";
import MeetingPage from "../pages/Customer/MeetingPage";
import EventPage from "../pages/Customer/EventPage";
import CospacePage from "../pages/Customer/CospacePage";
import RegisterPage from "../pages/Customer/RegisterPage";
import OrderPage from "../pages/Customer/OrderPage";
import PaymentPage from "../pages/Customer/PaymentPage";
import SuccessPage from "../pages/Customer/SuccessPage";
import RuanganPage from "../pages/Customer/RuanganPage";

// import halaman admin dashboard
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UserPage from "../pages/Dashboard/users/UserPage";
import CreateUserPage from "../pages/Dashboard/users/CreateUserPage";
import EditUserPage from "../pages/Dashboard/users/EditUserPage";
import BannerPage from "../pages/Dashboard/banners/BannerPage";
import CreateBannerPage from "../pages/Dashboard/banners/CreateBannerPage";
import EditBannerPage from "../pages/Dashboard/banners/EditBannerPage";
import FacilityPage from "../pages/Dashboard/facilities/FasilityPage";
import CreateFacilityPage from "../pages/Dashboard/facilities/CreateFacilityPage";
import EditFacilityPage from "../pages/Dashboard/facilities/EditFacilityPage";
import BankPage from "../pages/Dashboard/banks/BankPage";
import CreateBankPage from "../pages/Dashboard/banks/CreateBankPage";
import EditBankPage from "../pages/Dashboard/banks/EditBankPage";
import PrivateRoutes from "./PrivateRoutes";
import PrivateAdminRoutes from "./PrivateAdminRoutes";

function RouteIndex() {
  return (
    <>
      <Routes>
        {/* =========routes customer========== */}
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={LoginPage} />
        <Route
          path="/ruangan/:slug"
          element={
            <PrivateRoutes>
              <RuanganPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoutes>
              <RegisterPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoutes>
              <OrderPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/payment/:kodePesanan"
          element={
            <PrivateRoutes>
              <PaymentPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/success/:kodePesanan"
          element={
            <PrivateRoutes>
              <SuccessPage />
            </PrivateRoutes>
          }
        />

        {/* ==========routes dashboard=========== */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoutes>
              <DashboardPage />
            </PrivateAdminRoutes>
          }
        />

        {/* user folder */}
        <Route
          path="/admin/user"
          element={
            <PrivateAdminRoutes>
              <UserPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/user/new"
          element={
            <PrivateAdminRoutes>
              <CreateUserPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <PrivateAdminRoutes>
              <EditUserPage />
            </PrivateAdminRoutes>
          }
        />

        {/* fasilitas folder */}
        <Route
          path="/admin/facility"
          element={
            <PrivateAdminRoutes>
              <FacilityPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/facility/new"
          element={
            <PrivateAdminRoutes>
              <CreateFacilityPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/facility/:id"
          element={
            <PrivateAdminRoutes>
              <EditFacilityPage />
            </PrivateAdminRoutes>
          }
        />
        {/* banner folder */}
        <Route
          path="/admin/banner"
          element={
            <PrivateAdminRoutes>
              <BannerPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/banner/new"
          element={
            <PrivateAdminRoutes>
              <CreateBannerPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/banner/:id"
          element={
            <PrivateAdminRoutes>
              <EditBannerPage />
            </PrivateAdminRoutes>
          }
        />

        {/* bank folder */}
        <Route
          path="/admin/bank"
          element={
            <PrivateAdminRoutes>
              <BankPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/bank/new"
          element={
            <PrivateAdminRoutes>
              <CreateBankPage />
            </PrivateAdminRoutes>
          }
        />
        <Route
          path="/admin/bank/:id"
          element={
            <PrivateAdminRoutes>
              <EditBankPage />
            </PrivateAdminRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default RouteIndex;
