import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs } from '../store/jobsSlice';
import { MapPin, Building, Clock, CheckCircle2, Briefcase } from 'lucide-react';

const COLORS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777', '#7c3aed', '#2563eb', '#dc2626'];
const getColor = (str) => COLORS[(str?.charCodeAt(0) || 0) % COLORS.length];

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { appliedJobs, loading } = useSelector(state => state.jobs);

  useEffect(() => { dispatch(fetchAppliedJobs()); }, [dispatch]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>My Applications</h1>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>
          Track your career journey — {appliedJobs.length} application{appliedJobs.length !== 1 ? 's' : ''} submitted.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>Loading applications…</div>
      ) : appliedJobs.length === 0 ? (
        <div className="card" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <Briefcase size={48} style={{ margin: '0 auto 12px', color: '#d1d5db' }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: '#374151', marginBottom: 4 }}>No Applications Yet</div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>Browse available opportunities and apply to get started.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {appliedJobs.map(app => {
            const color = getColor(app.company_name);
            return (
              <div key={app.application_id} style={{
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 14,
                padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.2s'
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 10, background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0
                }}>
                  {app.company_name?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {app.company_name}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{app.position}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                      <MapPin size={12} /> {app.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
                      <Clock size={12} /> {app.type}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac',
                    borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600
                  }}>
                    <CheckCircle2 size={13} /> Applied
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
                    {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
