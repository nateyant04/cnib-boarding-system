import { Link } from 'react-router-dom';

export const Homepage = () => {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Boarding Portal</p>
          <h1 id="page-title">CNIB Dog Boarding Portal</h1>
          <p className="hero-text">
            Connecting service dog trainers with trusted volunteer boarders.
          </p>
          <Link id="login" className="primary-button" to="/login">
            <span>Log in to get started</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hero-image-wrap">
          <img
            src="/hero-dog-placeholder.png"
            alt="Service dog in training wearing a yellow vest"
            className="hero-image"
          />
        </div>
      </section>

      <section className="quick-access" aria-labelledby="quick-access-title">
        <h2 id="quick-access-title">Quick access</h2>
        <div className="access-grid">
          <Link className="access-card" to="/boarding-requests">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/>
                <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01"/>
              </svg>
            </span>
            <strong>Boarding Requests</strong>
            <span>View and respond to new boarding requests</span>
          </Link>

          <Link className="access-card" to="/my-dogs">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7.5 12.5c.7-.8 1.2-1.7 1.2-2.8A2.7 2.7 0 0 0 6 7a2.7 2.7 0 0 0-2.7 2.7c0 1.1.5 2 1.2 2.8"/>
                <path d="M19.5 12.5c.7-.8 1.2-1.7 1.2-2.8A2.7 2.7 0 0 0 18 7a2.7 2.7 0 0 0-2.7 2.7c0 1.1.5 2 1.2 2.8"/>
                <path d="M8 14.5c1-1.5 2.2-2.2 4-2.2s3 .7 4 2.2c.7 1 .6 2.4-.2 3.3-1 1.1-2.4 1.7-3.8 1.7s-2.8-.6-3.8-1.7c-.8-.9-.9-2.3-.2-3.3Z"/>
                <path d="M11 17h2"/>
              </svg>
            </span>
            <strong>My Dogs</strong>
            <span>View dogs in your care and their information</span>
          </Link>

          <Link className="access-card" to="/my-bookings">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/>
                <path d="m9 15 2 2 4-5"/>
              </svg>
            </span>
            <strong>My Bookings</strong>
            <span>Check upcoming and past stays</span>
          </Link>

          <Link className="access-card" to="/profile">
            <span className="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                <path d="M4 21a8 8 0 0 1 16 0"/>
              </svg>
            </span>
            <strong>My Profile</strong>
            <span>Manage your availability and information</span>
          </Link>
        </div>
      </section>

      <section className="message-card" aria-labelledby="message-title">
        <div className="message-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-4.35-9.4-8.4C.6 9.1 2.4 5 6.2 5c2 0 3.4 1.1 4.2 2.2C11.2 6.1 12.6 5 14.6 5c3.8 0 5.6 4.1 3.6 7.6C15.9 16.65 12 21 12 21Z"/>
          </svg>
        </div>
        <div>
          <h2 id="message-title">Thank you for helping raise extraordinary dogs.</h2>
          <p>Your time and care make a world of difference.</p>
        </div>
      </section>
    </main>
  );
};
