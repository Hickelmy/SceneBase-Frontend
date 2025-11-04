import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Protected pages
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import AdminUsers from './pages/admin/Users';
import AdminBanners from './pages/admin/Banners';
import AdminEmailTemplates from './pages/admin/EmailTemplates';
import AdminEmailCampaigns from './pages/admin/EmailCampaigns';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/auth/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/auth/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/auth/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/app/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
          <Route path="/app/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/app/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/app/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
          <Route path="/app/admin/banners" element={<ProtectedRoute adminOnly><AdminBanners /></ProtectedRoute>} />
          <Route path="/app/admin/email-templates" element={<ProtectedRoute adminOnly><AdminEmailTemplates /></ProtectedRoute>} />
          <Route path="/app/admin/email-campaigns" element={<ProtectedRoute adminOnly><AdminEmailCampaigns /></ProtectedRoute>} />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
