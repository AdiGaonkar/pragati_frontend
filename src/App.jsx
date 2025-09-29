import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';

function Protected({ children }) {
  const token = localStorage.getItem('eg_token');
  if (!token) return <Navigate to="/signin" replace />;
  return children;
}

export default function App(){
  return (
    <div className='w-full min-h-screen bg-gray-900'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={
            <Protected><Upload /></Protected>
          } />
          <Route path="/dashboard" element={
            <Protected><Dashboard /></Protected>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
  );
}
