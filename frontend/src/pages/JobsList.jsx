import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, applyToJob, fetchAppliedJobs } from '../store/jobsSlice';
import { Search, MapPin, Building, Clock, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

const COLORS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777', '#7c3aed', '#2563eb', '#dc2626'];
const getColor = (str) => COLORS[(str?.charCodeAt(0) || 0) % COLORS.length];

function JobCard({ job, hasApplied, onApply }) {
  const color = getColor(job.company_name);
  const initial = job.company_name?.[0]?.toUpperCase() || '?';

  return (
    <div className="job-card">
      <div className="job-avatar" style={{ background: color }}>
        {initial}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
          {job.company_name}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          {job.position}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span className="badge badge-blue">{job.type}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280' }}>
            <MapPin size={12} /> {job.location}
          </span>
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        {hasApplied ? (
          <button disabled style={{
            background: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac',
            borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6, cursor: 'default'
          }}>
            <CheckCircle2 size={14} /> Applied
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => onApply(job.id)}>
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}

export default function JobsList() {
  const dispatch = useDispatch();
  const { jobs, loading, appliedJobs } = useSelector(state => state.jobs);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  const hasApplied = (id) => appliedJobs.some(a => a.job_id === id || a.id === id);
  const handleApply = (id) => dispatch(applyToJob(id));

  const filtered = jobs.filter(job => {
    const s = search.toLowerCase();
    return (
      (!s || job.company_name.toLowerCase().includes(s) || job.position.toLowerCase().includes(s)) &&
      (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (!type || job.type === type)
    );
  });

  return (
    <div style={{ display: 'flex', gap: 28 }}>
      {/* Filters Panel */}
      <div className="filters-panel">
        <div className="card" style={{ padding: 20, position: 'sticky', top: 100 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Filters</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>Refine your architectural career path.</div>

          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Company Name</label>
            <input className="form-input" placeholder="e.g. Blueprints Inc."
              value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: 13 }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Location</label>
            <input className="form-input" placeholder="City or Remote"
              value={location} onChange={e => setLocation(e.target.value)} style={{ fontSize: 13 }} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="form-label">Employment Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              {['', 'Full Time', 'Part Time'].map(t => (
                <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)}
                    style={{ accentColor: '#2563eb' }} />
                  {t || 'All Types'}
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {}}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>Featured Opportunities</h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>Curated roles for the modern workforce.</p>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input className="form-input" placeholder="Search company or position..."
            style={{ paddingLeft: 40 }} value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>Loading opportunities…</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <Search size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div style={{ fontWeight: 600 }}>No jobs match your search</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(job => (
              <JobCard key={job.id} job={job} hasApplied={hasApplied(job.id)} onApply={handleApply} />
            ))}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                Showing {filtered.length} of {jobs.length} available opportunities
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
