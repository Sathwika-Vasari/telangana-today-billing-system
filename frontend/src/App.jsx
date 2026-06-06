import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useAlert from './hooks/useAlert';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AlertContainer from './components/AlertContainer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Advertisers from './pages/Advertisers';
import Campaigns from './pages/Campaigns';
import Payments from './pages/Payments';

const App = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { alerts, removeAlert } = useAlert();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && <Header user={user} onLogout={logout} />}
        
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar userRole={user?.role} />}
          
          <main className="flex-1">
            <div className="max-w-7xl mx-auto p-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/advertisers"
                  element={
                    <ProtectedRoute>
                      <Advertisers />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/campaigns"
                  element={
                    <ProtectedRoute>
                      <Campaigns />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/payments"
                  element={
                    <ProtectedRoute>
                      <Payments />
                    </ProtectedRoute>
                  }
                />
                
                <Route path="/" element={<Login />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
      
      <AlertContainer alerts={alerts} onRemove={removeAlert} />
    </Router>
  );
};

export default App;
