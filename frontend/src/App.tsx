import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Homepage } from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
        <Route path="/boarding-requests" element={<div>Boarding Requests (Coming Soon)</div>} />
        <Route path="/my-dogs" element={<div>My Dogs (Coming Soon)</div>} />
        <Route path="/my-bookings" element={<div>My Bookings (Coming Soon)</div>} />
        <Route path="/profile" element={<div>Profile (Coming Soon)</div>} />
        <Route path="/help" element={<div>Help (Coming Soon)</div>} />
        <Route path="/support" element={<div>Support (Coming Soon)</div>} />
        <Route path="/privacy" element={<div>Privacy (Coming Soon)</div>} />
        <Route path="/terms" element={<div>Terms (Coming Soon)</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
