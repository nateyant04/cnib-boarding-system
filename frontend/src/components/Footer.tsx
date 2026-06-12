import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <nav aria-label="Footer">
        <Link to="/help">Help</Link>
        <Link to="/support">Contact Support</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms of Use</Link>
      </nav>
    </footer>
  );
};
