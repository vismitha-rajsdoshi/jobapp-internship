import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, createJob, updateJob, deleteJob } from '../store/jobsSlice';
import { Plus, Edit2, Trash2, Building, MapPin, Clock, Eye, TrendingUp, Briefcase } from 'lucide-react';

const AVATARS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777', '#7c3aed'];
const getColor = (str) => AVATARS[(str?.charCodeAt(0) || 0) % AVATARS.length];

const EMPTY_FORM = { id: null, company_name: '', position: '', type: 'Full Time', location: '' };

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(state => state.jobs);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { dispatch(fetchJobs()); }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateJob({ id: formData.id, jobData: formData }));
      setIsEditing(false);
    } else {
      dispatch(createJob(formData));
    }
    setFormData(EMPTY_FORM);
    setShowForm(false);
  };

  const handleEdit = (job) => { setFormData(job); setIsEditing(true); setShowForm(true); };
  const handleCancel = () => { setFormData(EMPTY_FORM); setIsEditing(false); setShowForm(false); };
  const handleDelete = (id) => { if (window.confirm('Delete this job?')) dispatch(deleteJob(id)); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div className="stat-card">
          <div className="stat-label">Total Active Jobs</div>
          <div className="stat-value">
            {jobs.length}
            <span className="stat-badge">↑ Active</span>
          </div>
          <div style={{ marginTop: 12, height: 3, background: '#e5e7eb', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${Math.min(jobs.length * 8, 100)}%`, background: '#2563eb', borderRadius: 4 }}></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Applications</div>
          <div className="stat-value">—</div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#9ca3af' }}>Across all postings</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Platform Status</div>
          <div className="stat-value" style={{ fontSize: 20 }}>
            <span style={{ color: '#059669' }}>● </span>Live
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#9ca3af' }}>All systems operational</div>
        </div>
      </div>

      {/* Post / Edit Form */}
      {showForm ? (
        <div className="card">
          <div className="card-header">
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                {isEditing ? 'Edit Opportunity' : 'Post an Opportunity'}
              </h3>
              <p style={{ margin: 0, fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                Architect the future of your team with precision and clarity.
              </p>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#2563eb',
              background: '#eff6ff', padding: '4px 10px', borderRadius: 6
            }}>PREVIEW MODE</span>
          </div>

          <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="form-label">Company Name</label>
                <input className="form-input" required placeholder="e.g. Luminar Systems"
                  value={formData.company_name} onChange={e => setFormData({ ...formData, company_name: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Position Title</label>
                <input className="form-input" required placeholder="e.g. Senior Principal Architect"
                  value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">Job Type</label>
                  <select className="form-input" value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}>
                    <option>Full Time</option>
                    <option>Part Time</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Location</label>
                  <input className="form-input" required placeholder="San Francisco, CA"
                    value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? '✓ Save Changes' : '+ Save Job'}
                </button>
              </div>
            </form>

            {/* Live Preview */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>Live Blueprint</div>
              <div className="preview-card">
                {formData.company_name || formData.position ? (
                  <>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#2563eb', textTransform: 'uppercase', marginBottom: 6 }}>
                      {formData.company_name || 'Company Name'}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 12 }}>
                      {formData.position || 'Position Title'}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                      {formData.type && (
                        <span className="preview-tag" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                          {formData.type}
                        </span>
                      )}
                      {formData.location && (
                        <span className="preview-tag" style={{ background: '#dcfce7', color: '#15803d' }}>
                          📍 {formData.location}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>
                      Your posting will appear to job seekers once saved.
                    </div>
                    <div style={{
                      marginTop: 16, background: '#eff6ff', border: '1px solid #bfdbfe',
                      borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 8
                    }}>
                      <span style={{ fontSize: 16 }}>💡</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e40af' }}>Pro Tip</div>
                        <div style={{ fontSize: 11, color: '#3b82f6' }}>
                          Roles with "Senior" or "Principal" tend to attract 60% more qualified leads when posted mid-week.
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#9ca3af', padding: '24px 0' }}>
                    <Briefcase size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                    <div style={{ fontSize: 13 }}>Fill in the form to see a live preview</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Create New Listing
          </button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Recent Job Listings</h3>
            <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
              Monitoring the pulse of your current talent acquisitions.
            </p>
          </div>
          <a href="#" style={{ fontSize: 12, color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
            View All Listings →
          </a>
        </div>

        {loading ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#9ca3af' }}>Loading listings…</div>
        ) : jobs.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#9ca3af' }}>
            <Briefcase size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No job listings yet</div>
            <div style={{ fontSize: 13 }}>Click "Create New Listing" to post your first opportunity.</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: getColor(job.company_name),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0
                      }}>
                        {job.company_name?.[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827', fontSize: 13 }}>{job.position}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>ID-{job.id?.slice(0, 6)}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{job.company_name}</td>
                  <td>
                    <span className={`badge ${job.type === 'Full Time' ? 'badge-blue' : 'badge-orange'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td style={{ color: '#6b7280' }}>{job.location}</td>
                  <td><span className="badge badge-green">● Active</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button className="btn btn-ghost" style={{ padding: '6px 10px' }} onClick={() => handleEdit(job)}>
                        <Edit2 size={13} />
                      </button>
                      <button className="btn btn-danger" style={{ padding: '6px 10px' }} onClick={() => handleDelete(job.id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bottom info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div className="info-box-teal">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Talent Sourcing</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 16 }}>
            Instantly reach out to verified candidates that match your active requirements.
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 20, padding: '6px 16px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer'
          }}>Search Pool ↗</button>
        </div>
        <div className="info-box-slate">
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Hiring Insights</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 16 }}>
            Review the latest market trends and salary benchmarks for your open roles.
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 20, padding: '6px 16px', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer'
          }}>View Report ↑</button>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', marginBottom: 12 }}>⚡ Recent Activity</div>
          {jobs.slice(0, 3).map((job, i) => (
            <div key={job.id} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? '#2563eb' : '#9ca3af', marginTop: 5, flexShrink: 0 }}></div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>New listing: {job.position}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>at {job.company_name}</div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && <div style={{ fontSize: 12, color: '#9ca3af' }}>No recent activity</div>}
        </div>
      </div>
    </div>
  );
}
