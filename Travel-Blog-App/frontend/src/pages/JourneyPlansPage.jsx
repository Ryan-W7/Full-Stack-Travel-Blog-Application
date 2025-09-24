import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  

const JourneyPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: '',
    locations: '',
    startDate: '',
    endDate: '',
    activities: '',
    description: ''
  });
  const [editId, setEditId] = useState(null);

  const userId = 1; 

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get(`http://localhost:5000/api/journey-plans?userId=${userId}`);
    setPlans(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      journey_plan_locations: form.locations.split(',').map(loc => loc.trim()),
      startDate: form.startDate,
      endDate: form.endDate,
      list_of_activities: form.activities.split(',').map(act => act.trim()),
      description: form.description,
      userId
    };

    if (editId) {
      await axios.put(`http://localhost:5000/api/journey-plans/${editId}`, payload);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/journey-plans', payload);
    }

    setForm({
      name: '',
      locations: '',
      startDate: '',
      endDate: '',
      activities: '',
      description: ''
    });
    fetchPlans();
  };

  const handleEdit = (plan) => {
    setForm({
      name: plan.name,
      locations: plan.journey_plan_locations.join(', '),
      startDate: plan.start_date,
      endDate: plan.end_date,
      activities: plan.list_of_activities.join(', '),
      description: plan.description
    });
    setEditId(plan.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/journey-plans/${id}`, {
      data: { userId }
    });
    fetchPlans();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Journey Plans</h2>

      <Link
        to="/travel-logs"
        style={{
          display: 'inline-block',
          marginBottom: '1rem',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Back to Travel Logs
      </Link>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Plan Name" value={form.name} onChange={handleChange} required />
        <input name="locations" placeholder="Locations (comma-separated)" value={form.locations} onChange={handleChange} required />
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
        <input name="activities" placeholder="Activities (comma-separated)" value={form.activities} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">{editId ? 'Update Plan' : 'Add Plan'}</button>
      </form>

      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            <strong>{plan.name}</strong>: {plan.description}
            <br />
            Locations: {plan.journey_plan_locations.join(', ')} <br />
            From {plan.start_date} to {plan.end_date} <br />
            Activities: {plan.list_of_activities.join(', ')}
            <br />
            <button onClick={() => handleEdit(plan)}>Edit</button>
            <button onClick={() => handleDelete(plan.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyPlansPage;
