import React, { useEffect, useState } from "react";
import api from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [uploads, setUploads] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchUploads();
  }, []);

  async function fetchUploads() {
    try {
      const res = await api.get("/dashboard/my-uploads");
      setUploads(res.data.uploads || []);
      if (res.data.uploads && res.data.uploads.length) {
        setSelected(res.data.uploads[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function buildChartData(upload) {
    if (!upload || !upload.data) return [];
    return upload.data
      .map((r) => {
        const x = r.timestamp || r.time || r.date || "";
        return {
          time: x,
          demand: Number(r._consumption || 0),
          renewable: Number(r._renewable || 0),
          nonRenewable: Number(r._nonRenewable || 0),
        };
      })
      .slice(0, 500);
  }

  return (
    <>
      <Navbar />
      <div className="p-8 space-y-8 mt-10 text-white bg-gray-950 min-h-screen">
        {/* Title */}
        <div>
          <h2 className="text-4xl font-bold">Dashboard</h2>
          <p className="text-gray-400 mt-1">
            Your latest optimization snapshot
          </p>
        </div>

        {/* Recent Uploads */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
          {uploads.length ? (
            <ul className="space-y-2">
              {uploads.slice(0, 5).map((u, idx) => (
                <li
                  key={u._id || idx}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selected?._id === u._id
                      ? "bg-gray-800 border border-gray-700"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setSelected(u)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{u.originalName}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(u.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Demand: {u.stats?.sum || "--"} | Renewable:{" "}
                    {u.stats?.renewable || "--"} | Non-Renewable:{" "}
                    {u.stats?.nonRenewable || "--"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No uploads found</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Demand", value: `${selected?.stats?.sum || "--"} units` },
            { label: "Renewable Used", value: `${selected?.stats?.renewable || "--"} units` },
            { label: "Non-Renewable", value: `${selected?.stats?.nonRenewable || "--"} units` },
            { label: "Total Cost", value: `${selected?.stats?.cost || "--"} currency` },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gray-900 border border-gray-800 shadow-sm"
            >
              <h4 className="text-sm text-gray-400">{card.label}</h4>
              <p className="text-2xl font-semibold mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Demand vs Supply */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Demand vs Supply</h3>
            {selected ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={buildChartData(selected)}>
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      background: "#111827",
                      border: "1px solid #1f2937",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#60a5fa" dot={false} />
                  <Line type="monotone" dataKey="nonRenewable" stroke="#f87171" dot={false} />
                  <Line type="monotone" dataKey="renewable" stroke="#34d399" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>

          {/* Energy Mix */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Energy Mix</h3>
            {selected ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Renewable", value: selected?.stats?.renewable || 0 },
                      { name: "Non-Renewable", value: selected?.stats?.nonRenewable || 0 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    <Cell fill="#34d399" />
                    <Cell fill="#f87171" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-sm">
          <p className="text-gray-400">
            {selected
              ? "✅Optimization data loaded successfully."
              : "⚠️No optimization found. Upload and run optimization."}
          </p>
        </div>
      </div>
    </>
  );
}
