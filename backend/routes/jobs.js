const express = require('express');
const db = require('../db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all jobs (for users & admins)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new job (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { company_name, position, type, location } = req.body;
    if (!company_name || !position || !type || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.query(
      'INSERT INTO jobs (company_name, position, type, location, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company_name, position, type, location, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a job (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, position, type, location } = req.body;
    
    const result = await db.query(
      'UPDATE jobs SET company_name = $1, position = $2, type = $3, location = $4 WHERE id = $5 RETURNING *',
      [company_name, position, type, location, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a job (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Apply to a job (user only)
router.post('/:id/apply', authenticateToken, async (req, res) => {
  try {
    const { id: job_id } = req.params;
    const user_id = req.user.id;

    // Check if job exists
    const jobCheck = await db.query('SELECT id FROM jobs WHERE id = $1', [job_id]);
    if (jobCheck.rows.length === 0) return res.status(404).json({ error: 'Job not found' });

    // Check if already applied
    const appliedCheck = await db.query('SELECT id FROM applications WHERE job_id = $1 AND user_id = $2', [job_id, user_id]);
    if (appliedCheck.rows.length > 0) return res.status(400).json({ error: 'Already applied to this job' });

    const result = await db.query(
      'INSERT INTO applications (job_id, user_id) VALUES ($1, $2) RETURNING *',
      [job_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
