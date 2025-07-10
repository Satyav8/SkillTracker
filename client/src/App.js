import React, { useState } from 'react';

const App = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateSkill = () => {
    if (!newSkill.trim()) return;

    const skill = { name: newSkill.trim(), level };

    if (editIndex !== null) {
      const updated = [...skills];
      updated[editIndex] = skill;
      setSkills(updated);
      setEditIndex(null);
    } else {
      setSkills([...skills, skill]);
    }

    setNewSkill('');
    setLevel('Beginner');
  };

  const handleEdit = (index) => {
    const skill = skills[index];
    setNewSkill(skill.name);
    setLevel(skill.level);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLevel === 'All Levels' || s.level === filterLevel)
  );

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🧠 SkillForge Tracker</h1>

        <div style={styles.inputRow}>
          <input
            placeholder="✍️ Enter Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            style={styles.input}
          />
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button onClick={addOrUpdateSkill} style={styles.addBtn}>
            {editIndex !== null ? '🔁 Update' : '➕ Add'}
          </button>
        </div>

        <div style={styles.inputRow}>
          <input
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} style={styles.select}>
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <ul style={styles.skillList}>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((s, i) => (
              <li key={i} style={styles.skillCard}>
                <div>
                  <span style={styles.skillName}>{s.name}</span>
                  <span style={{ ...styles.levelTag, ...styles[`level_${s.level}`] }}>{s.level}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(i)} style={styles.iconBtn}>✏️</button>
                  <button onClick={() => handleDelete(i)} style={styles.iconBtn}>🗑️</button>
                </div>
              </li>
            ))
          ) : (
            <p style={styles.noSkill}>🧩 No skills found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  body: {
    background: 'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '2rem',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: '#fff',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    letterSpacing: '1px',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
  },
  select: {
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
  },
  addBtn: {
    padding: '0.8rem 1rem',
    background: '#10b981',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  skillList: {
    marginTop: '1.5rem',
    listStyle: 'none',
    padding: 0,
  },
  skillCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    marginBottom: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontWeight: '600',
    fontSize: '1rem',
    marginRight: '1rem',
  },
  levelTag: {
    padding: '0.3rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  level_Beginner: {
    backgroundColor: '#2563eb',
  },
  level_Intermediate: {
    backgroundColor: '#f59e0b',
  },
  level_Advanced: {
    backgroundColor: '#ef4444',
  },
  noSkill: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#aaa',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
};

export default App;











