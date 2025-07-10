import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const API_BASE = "/skills";

export default function App() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editedSkill, setEditedSkill] = useState("");
  const [editedLevel, setEditedLevel] = useState("Beginner");

  useEffect(() => {
    if (!user) return;
    axios
      .get(API_BASE)
      .then((res) => setSkills(res.data))
      .catch(console.error);
  }, [user]);

  const login = async () => {
    const res = await axios.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    const userRes = await axios.get("/auth/me");
    setUser(userRes.data);
  };

  const signup = async () => {
    const res = await axios.post("/auth/signup", form);
    localStorage.setItem("token", res.data.token);
    const userRes = await axios.get("/auth/me");
    setUser(userRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setSkills([]);
  };

  const addSkill = async (e) => {
    e.preventDefault();
    if (!skill.trim()) return;
    const res = await axios.post(API_BASE, { name: skill, level });
    setSkills([...skills, res.data]);
    setSkill("");
    setLevel("Beginner");
  };

  const deleteSkill = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    setSkills(skills.filter((s) => s._id !== id));
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
    const res = await axios.put(`${API_BASE}/${id}`, {
      name: editedSkill,
      level: editedLevel,
    });
    setSkills(skills.map((s) => (s._id === id ? res.data : s)));
    cancelEdit();
  };

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLevel === "All" || s.level === filterLevel)
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-600">
            🚀 Welcome to SkillForge
          </h1>
          <input
            placeholder="Name"
            className="w-full p-3 mb-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="w-full p-3 mb-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full p-3 mb-4 border rounded-lg"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="flex gap-3">
            <button
              onClick={signup}
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
            >
              Sign Up
            </button>
            <button
              onClick={login}
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-indigo-700">⚡ Skill Tracker</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={addSkill}
          className="flex flex-col sm:flex-row items-center gap-4 bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <input
            type="text"
            placeholder="Enter a skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/2"
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/4"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            ➕ Add
          </button>
        </form>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full"
          />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full sm:w-1/3"
          >
            <option value="All">All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredSkills.length === 0 ? (
            <p className="text-gray-500">No matching skills found.</p>
          ) : (
            filteredSkills.map((skill) => (
              <div
                key={skill._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                {editingId === skill._id ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <input
                      value={editedSkill}
                      onChange={(e) => setEditedSkill(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                    <select
                      value={editedLevel}
                      onChange={(e) => setEditedLevel(e.target.value)}
                      className="border p-2 rounded"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                    <div className="flex gap-2">
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
                      <div className="font-semibold text-lg text-gray-800">{skill.name}</div>
                      <div className="text-sm text-gray-500">Level: {skill.level}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(skill)}
                        className="text-indigo-600 hover:text-indigo-800 text-lg"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteSkill(skill._id)}
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}









