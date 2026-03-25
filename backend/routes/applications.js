const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all jobs applied by logged user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id;
    const query = `
      SELECT a.id as application_id, a.applied_at, j.*
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.user_id = $1
      ORDER BY a.applied_at DESC
    `;
    const result = await db.query(query, [user_id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
