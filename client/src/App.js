import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/skills";

export default function App() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [skills, setSkills] = useState([]);

  // Fetch existing skills on page load
  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => setSkills(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add new skill
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center flex justify-center items-center gap-2">
        ⚡ Skill Tracker
      </h1>

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

      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet.</p>
        ) : (
          skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white p-4 shadow rounded border border-gray-200 mb-2"
            >
              <div className="font-medium text-lg">{skill.name}</div>
              <div className="text-sm text-gray-500">Level: {skill.level}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



