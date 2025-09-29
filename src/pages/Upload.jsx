import React, { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    if (!file) return setError("Select a CSV file first");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await api.post("/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Upload successful");
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed");
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Upload Your <span className="text-gray-600">Energy Data⚡</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          Upload your electricity consumption CSV file to analyze trends, view
          costs, and get smart optimization insights.  
          Your journey to energy efficiency starts here.
        </p>
        <div className="mt-8 animate-bounce text-blue-400">↓</div>
      </section>

      {/* Upload Form Section */}
      <section className="flex justify-center items-center py-16 px-4">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-center text-white">
            Upload CSV
          </h2>

          {msg && (
            <div className="mt-4 text-sm text-green-400 bg-green-900/30 border border-green-600/30 px-3 py-2 rounded-lg">
              {msg}
            </div>
          )}
          {error && (
            <div className="mt-4 text-sm text-red-400 bg-red-900/30 border border-red-600/30 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-300 border border-white/20 rounded-lg cursor-pointer bg-white/5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg transition"
            >
              Upload
            </button>
          </form>
        </div>
      </section>
    </div>
    </>
  );
}
