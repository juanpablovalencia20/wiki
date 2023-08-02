import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import "./style.scss";
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import { DarkModeContext } from './context/darkModeContext';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Profile from './pages/profile/Profile';
import { AuthContext } from "./context/authContext";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext); 

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Layout /> : <Navigate to="/auth" />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;