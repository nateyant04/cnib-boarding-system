import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="brand" aria-label="CNIB Dog Boarding">
          <div className="logo-mark" aria-hidden="true">CNIB</div>
          <span className="brand-text">Dog Boarding</span>
        </div>
        <Link className="login-top" to="/login">Log in</Link>
      </header>
    </>
  );
};
