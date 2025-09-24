const express = require('express');
const router = express.Router();
const {
  getTravelLogs,
  createTravelLog,
  updateTravelLog,
  deleteTravelLog
} = require('../controllers/travelLogController');

router.get('/', getTravelLogs);
router.post('/', createTravelLog);
router.put('/:id', updateTravelLog);
router.delete('/:id', deleteTravelLog);

module.exports = router;
