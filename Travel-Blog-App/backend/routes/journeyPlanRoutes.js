const express = require('express');
const router = express.Router();
const {
  getJourneyPlans,
  createJourneyPlan,
  updateJourneyPlan,
  deleteJourneyPlan
} = require('../controllers/journeyPlanController');

router.get('/', getJourneyPlans);
router.post('/', createJourneyPlan);
router.put('/:id', updateJourneyPlan);
router.delete('/:id', deleteJourneyPlan);

module.exports = router;
