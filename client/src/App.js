import { useState } from "react";

function App() {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("Beginner");

  const handleAddSkill = () => {
    if (skillName.trim() === "") return;
    const newSkill = { name: skillName, level };
    setSkills([...skills, newSkill]);
    setSkillName("");
    setLevel("Beginner");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">🛠️ Skill Tracker</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Enter a skill"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full md:w-1/4"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          onClick={handleAddSkill}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Skill
        </button>
      </div>

      <div className="bg-white shadow-md rounded-md p-4 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Your Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet.</p>
        ) : (
          <ul className="space-y-2">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>{skill.name}</span>
                <span className="text-sm italic text-gray-500">{skill.level}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

