import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  

const TravelLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    tags: ''
  });
  const [editId, setEditId] = useState(null);

  const userId = 1;

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await axios.get(`http://localhost:5000/api/travel-logs?userId=${userId}`);
    setLogs(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      userId
    };

    if (editId) {
      await axios.put(`http://localhost:5000/api/travel-logs/${editId}`, payload);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/travel-logs', payload);
    }

    setForm({ title: '', description: '', startDate: '', endDate: '', tags: '' });
    fetchLogs();
  };

  const handleEdit = (log) => {
    setForm({
      title: log.title,
      description: log.description,
      startDate: log.start_date,
      endDate: log.end_date,
      tags: log.tags.join(', ')
    });
    setEditId(log.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/travel-logs/${id}`, {
      data: { userId }
    });
    fetchLogs();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Travel Logs</h2>

      <Link
        to="/journey-plans"
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
        Go to Journey Plans
      </Link>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
        <input name="tags" placeholder="Tags (comma-separated)" value={form.tags} onChange={handleChange} />
        <button type="submit">{editId ? 'Update Log' : 'Add Log'}</button>
      </form>

      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <strong>{log.title}</strong>: {log.description}
            <br />
            From {log.start_date} to {log.end_date} | Tags: {log.tags.join(', ')}
            <br />
            <button onClick={() => handleEdit(log)}>Edit</button>
            <button onClick={() => handleDelete(log.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelLogsPage;
