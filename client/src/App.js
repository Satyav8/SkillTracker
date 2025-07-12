import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const { user, logout } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [editIndex, setEditIndex] = useState(null);

  if (!user) {
    return <Login />;
  }

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

  const deleteSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const editSkill = (index) => {
    const skill = skills[index];
    setNewSkill(skill.name);
    setLevel(skill.level);
    setEditIndex(index);
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All Levels' || skill.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
  <BrowserRouter>
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-indigo-600">Skill Tracker</h1>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>

                <div className="mt-8">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mt-4">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div className="mt-8">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mt-4">
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <button
                  onClick={addOrUpdateSkill}
                  className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editIndex !== null ? 'Update Skill' : 'Add Skill'}
                </button>

                <div className="mt-8 space-y-4">
                  {filteredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.level}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editSkill(index)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSkill(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot Component */}
      <Chatbot />
    </div>
</BrowserRouter>
  );
};

export default App;











