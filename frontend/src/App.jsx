import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FlowProvider } from './context/FlowContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardNew from './pages/DashboardNew';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <FlowProvider>
        <AuthProvider>
          <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes - New Dashboard */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardNew />
                </ProtectedRoute>
              } 
            />
            
            {/* Legacy Protected Routes (with Layout) */}
            <Route 
              path="/templates" 
              element={
                <ProtectedRoute>
                  <Layout><Templates /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/old-dashboard" 
              element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings-old" 
              element={
                <ProtectedRoute>
                  <Layout><Settings /></Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </FlowProvider>
  </ThemeProvider>
  );
}

export default App;

