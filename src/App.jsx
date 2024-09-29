import { Routes, Route } from "react-router-dom"

//import halaman
import LandingPage from "./pages/Customer/LandingPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/Customer/HomePage"
import MeetingPage from "./pages/Customer/MeetingPage"
import EventPage from "./pages/Customer/EventPage"
import CospacePage from "./pages/Customer/CospacePage"
import RegisterPage from "./pages/Customer/RegisterPage"
import OrderPage from "./pages/Customer/OrderPage"
import PaymentPage from "./pages/Customer/PaymentPage"
import SuccessPage from "./pages/Customer/SuccessPage"

function App() {

  return (
    <>
      <Routes>
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
      </Routes>
    </>
  )
}

export default App
