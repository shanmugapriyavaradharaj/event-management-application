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
import CalendarView from './pages/CalendarView'
import OrderSummary from './pages/OrderSummary'
import PaymentSummary from './pages/PaymentSummary'
import TicketPage from './pages/TicketPage'
import CreatEvent from './pages/CreateEvent'
import AdminDashboard from './pages/admin/admindashboard'
import UserDashboard from './pages/admin/usermanagement'
import EventManagement from './pages/admin/eventlist'
import EventManagements from './pages/admin/eventlist'
import AdminRegisterPage from './pages/admin/adminregister'

axios.defaults.baseURL = 'http://localhost:4000/';
axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider> 
    <Routes>
            
      <Route path='/' element={<Layout />}>
        <Route index element = {<IndexPage />} />
        <Route path='/useraccount' element = {<UserAccountPage />}/>
        <Route path='/createEvent' element = {<AddEvent/>} />
        <Route path='/event/:id' element= {<EventPage/>} />
        <Route path='/calendar' element={<CalendarView />} />
        <Route path='/wallet' element={<TicketPage />}/>
        <Route path='/event/:id/ordersummary' element = {<OrderSummary />} />
      </Route>

      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/admin/register' element={<AdminRegisterPage />}/>
 \
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/forgotpassword' element = {<ForgotPassword/>} />
      <Route path='/resetpassword' element = {<ResetPassword/>} />
      <Route path='/event/:id/ordersummary/paymentsummary' element = {<PaymentSummary />} />

      {/* http://localhost:5173/admin/register */}

      {/* AdminDashboard */}
      <Route path='/admin' element = {<AdminDashboard/>} />
      {/* userDashboard */}
      <Route path='/admin/usermanagement' element = {<UserDashboard/>} />
      <Route path='/admin/eventmanagement' element = {<EventManagements/>} />
     
    </Routes>
    </UserContextProvider>  
    
  )
}

export default App
