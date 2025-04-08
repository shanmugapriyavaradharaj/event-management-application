/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import UserAccountPage from './pages/UserAccountPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AddEvent from './pages/AddEvent'
import EventPage from './pages/EventPage'
import EventType from './pages/admin/EventType'
import CalendarView from './pages/CalendarView'
import Venue from './pages/admin/venue'
import OrderSummary from './pages/OrderSummary'
import PaymentSummary from './pages/PaymentSummary'
import TicketPage from './pages/TicketPage'
import CreatEvent from './pages/CreateEvent'
import AdminDashboard from './pages/admin/admindashboard'
import UserDashboard from './pages/admin/usermanagement'
import EventManagement from './pages/admin/eventlist'
import EventManagements from './pages/admin/eventlist'
import AdminRegisterPage from './pages/admin/adminregister'
import PrivateEvents from './pages/admin/privateevents'
import CreateEvent from './pages/admin/privateevents'
import PrivateEventList from './pages/admin/privateEventslist'
import Booking from './pages/user/eventbooking'
import Eventsall from './pages/user/Eventsall'
import PaymentSuccess from './pages/payment/paymentsucces'
import BookingTable from './pages/admin/Bookings/getAllBookings'
import MyBookings from './pages/user/mybookings'
import TicketTable from './pages/admin/tickets/getallTickets'
import AllTicketDetails from './pages/admin/tickets/TicketPage'
import UnauthorizedPage from './unauthorised'
import Hotel from './pages/admin/Hotel'
import Transportation from './pages/admin/Transportation'

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials = true;

function App() {


  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <UserContextProvider>
      <Routes>


        {/*user   */}

        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/useraccount' element={<UserAccountPage />} />
          <Route path='/event/:id' element={<EventPage />} />
          <Route path='/calendar' element={<CalendarView />} />
          <Route path='/wallet' element={<TicketPage />} />
          <Route path='/event/:id/ordersummary' element={<OrderSummary />} />
        </Route>
        <Route path='/mybooking-details' element={<MyBookings />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin/register' element={<AdminRegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/event/:id/ordersummary/paymentsummary' element={<PaymentSummary />} />
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path="/booking/:eventId" element={<Booking />} />
        <Route path='/eventall' element={<Eventsall />} />

        {/* admin */}

        {/* http://localhost:5173/admin/register */}
        {
          user && (
            <>

              {
                user.role === "admin" ? <>
                  <Route path='/createEvent' element={<AddEvent />} />
                  <Route path='/admin/AddEvent' element={<EventType />} />
                  <Route path='/admin/AddVenue' element={<Venue />} />
                  <Route path='/admin/AddHotel' element={<Hotel />} />
                  <Route path='/admin/AddTransport' element={<Transportation/>}/>
                  <Route path='/admin/private-events-list' element={<PrivateEventList />} />
                  <Route path='/admin' element={<AdminDashboard />} />
                  <Route path='/admin/usermanagement' element={<UserDashboard />} />
                  <Route path='/admin/eventmanagement' element={<EventManagements />} />
                  <Route path='/admin/private-events' element={<CreateEvent />} />
                  <Route path='/admin/bookingtable' element={<BookingTable />} />
                  <Route path='/admin/booked-tickets' element={<AllTicketDetails />} />
                </> : null

              }
            </>
          )
        }
        ~
        <Route path='/*' element={<UnauthorizedPage />} />
      </Routes>
    </UserContextProvider>

  )
}

export default App
