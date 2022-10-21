import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/Signup'
import Forum from './components/Forum'
import Activity from './components/Activity'
import Home from './components/Home'
import Setup from './components/Setup'
import Header from './components/Header'
import HeaderUser from './components/HeaderUser'
import Discussion from './components/ForumsDiscussion'
import AddictionPage from './components/AddictionPage'
import DepressedPage from './components/DepressionPage'
import AbusePage from './components/AbusePage'
import Logout from './components/Logout'
import RegisterSuccess from './components/RegisterSuccess'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import ProfileEdit from './components/ProfileEdit'
import ProfileView from './components/ProfileView'
import AdminDash from './components/AdminDash'
import VerifyEmail from './components/VerifyEmail'
import ChatPage from './components/ChatPage'
import Verified from './components/Verified'
import Report from './components/Report'
import io from 'socket.io-client'
import NewsFeed from './components/NewsFeed'
import Groups from './components/Groups/GroupPage'
import PrivateRoutes from './components/PrivateRoutes'
import VerifyFail from './components/VerifyFail'


import './css/icofont.min.css'
import './css/app.css'
import './App2.css'

const ENDPOINT = "http://localhost:3000";
const socket = io.connect(ENDPOINT);

function HeaderView() {

  const location = useLocation();
  const headerGeneral = ['/login', '/register']
  const headerUser = ['/verified', '/verifyfail']

  if (headerGeneral.includes(location.pathname)) {
    return null
  } else if (headerUser.includes(location.pathname)) {
    return <HeaderUser />
  } else {
    return <Header />
  }

}


function App() {
  
  return (
    <div id="wrapper" className="wrapper">
      <>
        <BrowserRouter>
          <div className="App">
            <HeaderView />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />    
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/registered" element={<RegisterSuccess />} />
              <Route path="/verified" element={<Verified />} />
              <Route path="/verifyfail" element={<VerifyFail />} />
              <Route path="/verify/:token" element={< VerifyEmail />} />
            </Routes>

            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={< NewsFeed />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/chat" element={<ChatPage socket={socket} />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/forums" element={<Discussion />} />
                <Route path="/forums/addiction" element={<AddictionPage />} />
                <Route path="/forums/abuse" element={<AbusePage />} />
                <Route path="/forums/depression" element={<DepressedPage />} />
                <Route path="/admin" element={<AdminDash />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/report" element={< Report />} />
                <Route path="/profile/view/:id" element={<ProfileView />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </BrowserRouter>
      </>
    </div>
  )

}

export default App;
