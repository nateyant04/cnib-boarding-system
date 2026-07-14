import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="CNIB Dog Boarding">
          <div className="logo-mark" aria-hidden="true">CNIB</div>
          <span className="brand-text">Dog Boarding</span>
        </Link>
        
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--muted)' }}>
              {user?.firstName} {user?.lastName}
            </span>
            {user?.role === 'BOARDER' && (
              <Link to="/my-availability" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.95rem' }}>
                My Availability
              </Link>
            )}
            {user?.role === 'COORDINATOR' && (
              <Link to="/add-dog" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.95rem' }}>
                Add Dog
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="login-top"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              Log out
            </button>
          </div>
        ) : (
          <Link className="login-top" to="/login">Log in</Link>
        )}
      </header>
    </>
  );
};
