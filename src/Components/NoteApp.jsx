import React, { useState } from "react";

const NoteApp = () => {
  const [heading, setHeading] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitForm = () => {
    if (!heading.trim() || !notes.trim()) {
      alert("Please enter heading and notes");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: heading.trim(),
      topics: notes
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    setTasks((prev) => [...prev, newNote]);

    setHeading("");
    setNotes("");
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-900 to-slate-700 flex flex-col lg:flex-row">
      
      {/* Form Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md transition duration-300 hover:scale-105"
        >
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-6">
            Create Your Notes
          </h1>

          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            rows="6"
            placeholder="Write topics (one per line)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition active:scale-95"
          >
            Create Note
          </button>
        </form>
      </div>

      {/* Notes Section */}
      <div className="lg:w-1/2 p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto max-h-screen">
        {tasks.length === 0 ? (
          <p className="text-white text-center col-span-2">
            No Notes Yet
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white w-full h-72 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 p-4 relative flex flex-col"
            >
              <h2 className="text-xl font-bold text-orange-500 text-center border-b pb-2 mb-2">
                {task.title}
              </h2>

              <div className="flex-1 overflow-y-auto">
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
                  {task.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

    </section>
  );
};

export default NoteApp;