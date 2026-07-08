import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { availabilityService } from '../api/availabilityService';
import type { Availability, CreateAvailabilityRequest, UpdateAvailabilityRequest } from '../types/availability';

type FormState = {
  startDate: string;
  endDate: string;
  capacity: number;
  notes: string;
};

const emptyForm: FormState = { startDate: '', endDate: '', capacity: 1, notes: '' };

export const AvailabilityPage = () => {
  const { user } = useAuth();
  const [windows, setWindows] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!user?.userId) return;
    loadWindows();
  }, [user]);

  const loadWindows = async () => {
    if (!user?.userId) return;
    try {
      const data = await availabilityService.getByBoarder(user.userId);
      setWindows(data.sort((a, b) => a.startDate.localeCompare(b.startDate)));
    } catch {
      setError('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const openEditForm = (w: Availability) => {
    setEditingId(w.id);
    setForm({ startDate: w.startDate, endDate: w.endDate, capacity: w.capacity, notes: w.notes ?? '' });
    setError('');
    setSuccess('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;
    setError('');
    setSaving(true);
    try {
      if (editingId !== null) {
        const req: UpdateAvailabilityRequest = {
          startDate: form.startDate,
          endDate: form.endDate,
          capacity: form.capacity,
          notes: form.notes || undefined,
        };
        const updated = await availabilityService.update(editingId, req);
        setWindows(prev =>
          prev.map(w => (w.id === editingId ? updated : w))
              .sort((a, b) => a.startDate.localeCompare(b.startDate))
        );
        setSuccess('Availability updated successfully!');
      } else {
        const req: CreateAvailabilityRequest = {
          boarderId: user.userId,
          startDate: form.startDate,
          endDate: form.endDate,
          capacity: form.capacity,
          notes: form.notes || undefined,
        };
        const created = await availabilityService.create(req);
        setWindows(prev =>
          [...prev, created].sort((a, b) => a.startDate.localeCompare(b.startDate))
        );
        setSuccess('Availability added successfully!');
      }
      closeForm();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save availability');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setError('');
    setSuccess('');
    try {
      await availabilityService.delete(id);
      setWindows(prev => prev.filter(w => w.id !== id));
      setSuccess('Availability removed.');
    } catch {
      setError('Failed to delete availability');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day))
      .toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return <main style={{ padding: '4rem 2rem', textAlign: 'center' }}><p>Loading...</p></main>;
  }

  return (
    <main style={{ maxWidth: '700px', margin: '4rem auto', padding: '0 2rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem' }}>My Availability</h1>
        {!showForm && (
          <button onClick={openAddForm}
            style={{ padding: '0.6rem 1.2rem', background: 'var(--yellow)', color: 'var(--black)', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
            + Add Window
          </button>
        )}
      </div>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
        Set the date ranges when you are available to board dogs.
      </p>

      {error && (
        <div style={{ padding: '1rem', background: '#fee', border: '1px solid #fcc', borderRadius: '0.5rem', color: '#c33', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ padding: '1rem', background: '#efe', border: '1px solid #cfc', borderRadius: '0.5rem', color: '#363', marginBottom: '1rem' }}>
          {success}
        </div>
      )}

      {showForm && (
        <div style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>
            {editingId !== null ? 'Edit Availability Window' : 'New Availability Window'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.95rem' }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.95rem' }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                  required
                  min={form.startDate || undefined}
                  style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.95rem' }}>
                Max Dogs (Capacity)
              </label>
              <input
                type="number"
                value={form.capacity}
                onChange={e => setForm(f => ({ ...f, capacity: Math.max(1, Number(e.target.value)) }))}
                min={1}
                max={10}
                required
                style={{ width: '100px', padding: '0.6rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 'bold', fontSize: '0.95rem' }}>
                Notes (Optional)
              </label>
              <textarea
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3}
                placeholder="Any special conditions or notes..."
                style={{ width: '100%', padding: '0.6rem', fontSize: '1rem', border: '2px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={saving}
                style={{ flex: 1, padding: '0.85rem', background: saving ? 'var(--muted)' : 'var(--black)', color: 'var(--white)', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
                {saving ? 'Saving...' : editingId !== null ? 'Save Changes' : 'Add Availability'}
              </button>
              <button type="button" onClick={closeForm} disabled={saving}
                style={{ flex: 1, padding: '0.85rem', background: 'var(--white)', color: 'var(--black)', border: '2px solid var(--border)', borderRadius: '0.75rem', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {windows.length === 0 ? (
        <div style={{ background: 'var(--white)', padding: '3rem 2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', textAlign: 'center', color: 'var(--muted)' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No availability windows set.</p>
          <p>Click <strong>+ Add Window</strong> to let coordinators know when you can board dogs.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {windows.map(w => (
            <div key={w.id}
              style={{ background: 'var(--white)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                  {formatDate(w.startDate)} &ndash; {formatDate(w.endDate)}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: w.notes ? '0.25rem' : 0 }}>
                  Capacity: {w.capacity} {w.capacity === 1 ? 'dog' : 'dogs'}
                </p>
                {w.notes && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.notes}</p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => openEditForm(w)}
                  style={{ padding: '0.4rem 0.9rem', background: 'var(--surface)', color: 'var(--black)', border: '1px solid var(--border)', borderRadius: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(w.id)}
                  disabled={deletingId === w.id}
                  style={{ padding: '0.4rem 0.9rem', background: deletingId === w.id ? 'var(--muted)' : '#fee', color: '#c33', border: '1px solid #fcc', borderRadius: '0.5rem', cursor: deletingId === w.id ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                  {deletingId === w.id ? '...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
