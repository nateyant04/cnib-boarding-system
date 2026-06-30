import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    setError('');
    setLoading(true);

    try {
      console.log('Calling login function...');
      await login({ email, password });
      console.log('Login successful!');
      // Redirect to homepage on successful login
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
      console.log('Login attempt finished');
    }
  };

  return (
    <main style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <div style={{ 
        background: 'var(--white)', 
        padding: '2rem', 
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Log in</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
          Access the CNIB Dog Boarding Portal
        </p>

        {error && (
          <div style={{
            padding: '1rem',
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '0.5rem',
            color: '#c33',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? 'var(--muted)' : 'var(--black)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </main>
  );
};
