import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dogService } from '../api/dogService';
import { userService } from '../api/userService';
import type { UserProfile } from '../types/user';

export const AddDog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [puppyRaisers, setPuppyRaisers] = useState<UserProfile[]>([]);
  const [loadingRaisers, setLoadingRaisers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [foodType, setFoodType] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [puppyRaiserId, setPuppyRaiserId] = useState('');

  useEffect(() => {
    if (user?.role !== 'COORDINATOR') {
      navigate('/');
      return;
    }
    userService.getUsersByRole('PUPPY_RAISER')
      .then(setPuppyRaisers)
      .catch(() => setError('Failed to load puppy raisers'))
      .finally(() => setLoadingRaisers(false));
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await dogService.create({
        name,
        breed: breed || undefined,
        age: age ? Number(age) : undefined,
        medicalInfo: medicalInfo || undefined,
        foodType: foodType || undefined,
        profilePictureUrl: profilePictureUrl || undefined,
        puppyRaiserId: Number(puppyRaiserId),
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create dog profile');
    } finally {
      setSaving(false);
    }
  };

  if (user?.role !== 'COORDINATOR') return null;

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid var(--border)',
    borderRadius: '0.5rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold' as const,
  };

  const fieldStyle = { marginBottom: '1.5rem' };

  return (
    <main style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 2rem 4rem' }}>
      <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Add Dog Profile</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
          Create a new dog profile and assign it to a puppy raiser.
        </p>

        {error && (
          <div style={{ padding: '1rem', background: '#fee', border: '1px solid #fcc', borderRadius: '0.5rem', color: '#c33', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Dog Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="e.g. Buddy"
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Puppy Raiser *</label>
            {loadingRaisers ? (
              <p style={{ color: 'var(--muted)' }}>Loading puppy raisers...</p>
            ) : (
              <select
                value={puppyRaiserId}
                onChange={e => setPuppyRaiserId(e.target.value)}
                required
                style={{ ...inputStyle, background: 'var(--white)' }}
              >
                <option value="">Select a puppy raiser</option>
                {puppyRaisers.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.firstName} {r.lastName} ({r.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Breed</label>
              <input
                type="text"
                value={breed}
                onChange={e => setBreed(e.target.value)}
                placeholder="e.g. Labrador"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Age (years)</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                min={0}
                max={30}
                placeholder="e.g. 2"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Medical Information</label>
            <textarea
              value={medicalInfo}
              onChange={e => setMedicalInfo(e.target.value)}
              rows={3}
              placeholder="Allergies, medications, vet notes..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Food / Diet</label>
            <textarea
              value={foodType}
              onChange={e => setFoodType(e.target.value)}
              rows={2}
              placeholder="Brand, portions, schedule..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Profile Picture URL</label>
            <input
              type="url"
              value={profilePictureUrl}
              onChange={e => setProfilePictureUrl(e.target.value)}
              placeholder="https://..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={saving || loadingRaisers}
              style={{ flex: 1, padding: '1rem', background: saving ? 'var(--muted)' : 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
            >
              {saving ? 'Saving...' : 'Create Dog Profile'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={saving}
              style={{ flex: 1, padding: '1rem', background: 'var(--white)', color: 'var(--black)', border: '2px solid var(--border)', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
