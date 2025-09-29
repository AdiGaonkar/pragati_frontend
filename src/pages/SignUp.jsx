import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";  // ✅ import emailjs

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/register", { name, email, password });

      // save to localStorage
      localStorage.setItem("eg_token", res.data.token);
      localStorage.setItem("eg_name", res.data.user.name);

      // ✅ Send Welcome Email
      sendWelcomeEmail(res.data.user.name, res.data.user.email);

      // redirect to upload
      navigate("/upload");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to register");
    }
  }

  // ✅ Function to send welcome email via EmailJS
  function sendWelcomeEmail(userName, userEmail) {
    const serviceId = "your_service_id";  // 🔑 from EmailJS dashboard
    const templateId = "your_template_id"; // 🔑 from EmailJS dashboard
    const publicKey = "your_public_key";   // 🔑 from EmailJS dashboard

    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      message: `Welcome ${userName}! 🎉 Thanks for joining ElectroGrid. Start optimizing your energy usage today.`
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("✅ Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("❌ Failed to send email:", error);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-gray-300">
            Join ElectroGrid and optimize your energy usage ⚡
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 border border-red-500/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg transition"
          >
            Register & Upload
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Link to Sign In */}
        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-400 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
