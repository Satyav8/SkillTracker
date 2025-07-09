import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/skills";

export default function App() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [skills, setSkills] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editedSkill, setEditedSkill] = useState("");
  const [editedLevel, setEditedLevel] = useState("Beginner");

  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addSkill = async (e) => {
    e.preventDefault();
    if (!skill.trim()) return;

    try {
      const res = await axios.post(API_BASE, { name: skill, level });
      setSkills([...skills, res.data]);
      setSkill("");
      setLevel("Beginner");
    } catch (err) {
      console.error("Add skill failed:", err);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (skill) => {
    setEditingId(skill._id);
    setEditedSkill(skill.name);
    setEditedLevel(skill.level);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedSkill("");
    setEditedLevel("Beginner");
  };

  const updateSkill = async (id) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, {
        name: editedSkill,
        level: editedLevel,
      });
      setSkills(skills.map((s) => (s._id === id ? res.data : s)));
      cancelEdit();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "All" || s.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">⚡ Skill Tracker</h1>

      <form
        onSubmit={addSkill}
        className="flex flex-col sm:flex-row items-center gap-3 bg-white p-4 rounded-md shadow-md max-w-2xl mx-auto"
      >
        <input
          type="text"
          placeholder="Enter a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-1/3"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          ➕ Add Skill
        </button>
      </form>

      {/* 🔍 Search + Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4 max-w-2xl mx-auto mt-6">
        <input
          type="text"
          placeholder="🔍 Search skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* 🧠 Skill List */}
      <div className="mt-4 max-w-2xl mx-auto">
        {filteredSkills.length === 0 ? (
          <p className="text-gray-500">No matching skills found.</p>
        ) : (
          filteredSkills.map((skill) => (
            <div
              key={skill._id}
              className="bg-white p-4 shadow rounded border border-gray-200 mb-2 flex justify-between items-center"
            >
              {editingId === skill._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    value={editedSkill}
                    onChange={(e) => setEditedSkill(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <select
                    value={editedLevel}
                    onChange={(e) => setEditedLevel(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => updateSkill(skill._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-medium text-lg">{skill.name}</div>
                    <div className="text-sm text-gray-500">Level: {skill.level}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(skill)}
                      className="text-blue-600 hover:text-blue-800 font-bold"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✖
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}





