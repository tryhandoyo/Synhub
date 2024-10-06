import { Routes, Route } from "react-router-dom"

//import halaman customer
import LandingPage from "../pages/Customer/LandingPage"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/Customer/HomePage"
import MeetingPage from "../pages/Customer/MeetingPage"
import EventPage from "../pages/Customer/EventPage"
import CospacePage from "../pages/Customer/CospacePage"
import RegisterPage from "../pages/Customer/RegisterPage"
import OrderPage from "../pages/Customer/OrderPage"
import PaymentPage from "../pages/Customer/PaymentPage"
import SuccessPage from "../pages/Customer/SuccessPage"

// import halaman admin dashboard
import DashboardPage from "../pages/Dashboard/DashboardPage"
import UserPage from "../pages/Dashboard/users/UserPage"
import CreateUserPage from "../pages/Dashboard/users/CreateUserPage"
import EditUserPage from "../pages/Dashboard/users/EditUserPage"

function RouteIndex() {

  return (
    <>
      <Routes>
        {/* =========routes customer========== */}
        <Route path="/" Component={LandingPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/home" Component={HomePage} />
        <Route path="/ruang-acara" Component={EventPage} />
        <Route path="/cospace" Component={CospacePage} />
        <Route path="/ruang-meeting" Component={MeetingPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/order" Component={OrderPage} />
        <Route path="/payment" Component={PaymentPage} />
        <Route path="/success" Component={SuccessPage} />

        {/* ==========routes dashboard=========== */}
        <Route path="/admin/dashboard" element={<DashboardPage/>}/>
        {/* user folder */}
        <Route path="/admin/user" element={<UserPage/>}/>
        <Route path="/admin/user/new" element={<CreateUserPage/>}/>
        <Route path="/admin/user/:id" element={<EditUserPage/>}/>
        {/* banner folder */}
        <Route path="/admin/banner" element={<BannerPage/>}/>
      </Routes>
    </>
  )
}

export default RouteIndex
