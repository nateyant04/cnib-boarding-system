import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../api/userService';
import type { UserProfile } from '../types/user';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.userId) return;
      try {
        const data = await userService.getUserById(user.userId);
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone || '');
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const updateData: any = { firstName, lastName, email, phone: phone || null };
      if (password) updateData.password = password;
      const updatedProfile = await userService.updateProfile(user.userId, updateData);
      setProfile(updatedProfile);
      setSuccess('Profile updated successfully!');
      setPassword('');
      setEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
      setPhone(profile.phone || '');
      setPassword('');
    }
    setEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading) return <main style={{ padding: '4rem 2rem', textAlign: 'center' }}><p>Loading profile...</p></main>;
  if (!profile) return <main style={{ padding: '4rem 2rem', textAlign: 'center' }}><p>Profile not found</p></main>;

  return (
    <main style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
      <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Profile</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>View and edit your account information</p>

        {error && <div style={{ padding: '1rem', background: '#fee', border: '1px solid #fcc', borderRadius: '0.5rem', color: '#c33', marginBottom: '1rem' }}>{error}</div>}
        {success && <div style={{ padding: '1rem', background: '#efe', border: '1px solid #cfc', borderRadius: '0.5rem', color: '#363', marginBottom: '1rem' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={!editing} required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', background: editing ? 'var(--white)' : 'var(--surface)' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!editing} required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', background: editing ? 'var(--white)' : 'var(--surface)' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editing} required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', background: editing ? 'var(--white)' : 'var(--surface)' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone (Optional)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!editing}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', background: editing ? 'var(--white)' : 'var(--surface)' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Role</label>
            <input type="text" value={profile.role.replace('_', ' ')} disabled
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', background: 'var(--surface)', color: 'var(--muted)' }} />
          </div>

          {editing && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>New Password (Leave blank to keep current)</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password"
                style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit' }} />
            </div>
          )}

          {!editing ? (
            <button type="button" onClick={() => setEditing(true)}
              style={{ width: '100%', padding: '1rem', background: 'var(--yellow)', color: 'var(--black)', border: 'none', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={saving}
                style={{ flex: 1, padding: '1rem', background: saving ? 'var(--muted)' : 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleCancel} disabled={saving}
                style={{ flex: 1, padding: '1rem', background: 'var(--white)', color: 'var(--black)', border: '2px solid var(--border)', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
