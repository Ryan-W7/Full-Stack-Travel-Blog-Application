const db = require('../models/db');  

exports.getTravelLogs = (req, res) => {
  const userId = req.query.userId;  

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  db.query('SELECT * FROM travel_logs WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch logs' });

    results.forEach(log => {
      log.tags = log.tags ? JSON.parse(log.tags) : [];
    });

    res.json(results);
  });
};


exports.createTravelLog = (req, res) => {
  const { title, description, startDate, endDate, tags, userId } = req.body;
  const sql = 'INSERT INTO travel_logs (title, description, start_date, end_date, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, startDate, endDate, JSON.stringify(tags), userId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to create log' });

    res.json({ message: 'Log created', id: result.insertId });
  });
};

exports.updateTravelLog = (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, tags, userId } = req.body;

  const sql = `
    UPDATE travel_logs 
    SET title = ?, description = ?, start_date = ?, end_date = ?, tags = ?
    WHERE id = ? AND user_id = ?
  `;
  db.query(sql, [title, description, startDate, endDate, JSON.stringify(tags), id, userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update log' });

    res.json({ message: 'Log updated' });
  });
};

exports.deleteTravelLog = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  db.query('DELETE FROM travel_logs WHERE id = ? AND user_id = ?', [id, userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete log' });

    res.json({ message: 'Log deleted' });
  });
};
