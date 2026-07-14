import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { AvailabilityPage } from './pages/Availability';
import { AddDog } from './pages/AddDog';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/my-availability"
            element={
              <ProtectedRoute>
                <AvailabilityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-dog"
            element={
              <ProtectedRoute>
                <AddDog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/boarding-requests"
            element={
              <ProtectedRoute>
                <div>Boarding Requests (Coming Soon)</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-dogs" 
            element={
              <ProtectedRoute>
                <div>My Dogs (Coming Soon)</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-bookings" 
            element={
              <ProtectedRoute>
                <div>My Bookings (Coming Soon)</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/help" element={<div>Help (Coming Soon)</div>} />
          <Route path="/support" element={<div>Support (Coming Soon)</div>} />
          <Route path="/privacy" element={<div>Privacy (Coming Soon)</div>} />
          <Route path="/terms" element={<div>Terms (Coming Soon)</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
