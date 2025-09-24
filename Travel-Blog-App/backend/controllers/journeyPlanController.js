const db = require('../models/db');

exports.getJourneyPlans = (req, res) => {
    const userId = req.query.userId;
    db.query('SELECT * FROM journey_plans WHERE user_id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch plans' });
      results.forEach(plan => {
        plan.journey_plan_locations = plan.journey_plan_locations ? JSON.parse(plan.journey_plan_locations) : [];
        plan.list_of_activities = plan.list_of_activities ? JSON.parse(plan.list_of_activities) : [];
      });
      res.json(results);
    });
  };
  
  exports.createJourneyPlan = (req, res) => {
    const { name, journey_plan_locations, startDate, endDate, list_of_activities, description, userId } = req.body;
    const sql = `
      INSERT INTO journey_plans (name, journey_plan_locations, start_date, end_date, list_of_activities, description, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
      name,
      JSON.stringify(journey_plan_locations),
      startDate,
      endDate,
      JSON.stringify(list_of_activities),
      description,
      userId
    ], (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create journey plan' });
      res.json({ message: 'Journey plan created', id: result.insertId });
    });
  };
  
  exports.updateJourneyPlan = (req, res) => {
    const { id } = req.params;
    const { name, journey_plan_locations, startDate, endDate, list_of_activities, description, userId } = req.body;
    const sql = `
      UPDATE journey_plans
      SET name = ?, journey_plan_locations = ?, start_date = ?, end_date = ?, list_of_activities = ?, description = ?
      WHERE id = ? AND user_id = ?
    `;
    db.query(sql, [
      name,
      JSON.stringify(journey_plan_locations),
      startDate,
      endDate,
      JSON.stringify(list_of_activities),
      description,
      id,
      userId
    ], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update journey plan' });
      res.json({ message: 'Journey plan updated' });
    });
  };
  
  exports.deleteJourneyPlan = (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    db.query('DELETE FROM journey_plans WHERE id = ? AND user_id = ?', [id, userId], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete journey plan' });
      res.json({ message: 'Journey plan deleted' });
    });
  };