const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const travelLogRoutes = require('./routes/travelLogRoutes');
const journeyPlanRoutes = require('./routes/journeyPlanRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/travel-logs', travelLogRoutes);
app.use('/api/journey-plans', journeyPlanRoutes);


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});