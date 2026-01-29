"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const url = isSignup
      ? "http://localhost:5000/api/auth/signin"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isSignup
            ? formData
            : { email: formData.email, password: formData.password },
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message);

        if (!isSignup && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          router.push("/");
        }
      }
    } catch (err) {
      setMessage("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <form
          onSubmit={handleSubmit}
          className="w-[360px] bg-slate-950 text-white p-6 rounded-2xl shadow-2xl border border-slate-800"
        >
          {" "}
          <h2 className="text-2xl font-bold text-center mb-5">
            {" "}
            {isSignup ? "Create Account" : "Login"}{" "}
          </h2>{" "}
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}{" "}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full mb-3 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />{" "}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />{" "}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold disabled:opacity-60"
          >
            {" "}
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}{" "}
          </button>{" "}
          {message && (
            <p className="text-center text-sm text-blue-400 mt-3">
              {" "}
              {message}{" "}
            </p>
          )}{" "}
          <p className="text-center text-sm mt-4 text-slate-400">
            {" "}
            {isSignup ? "Already have an account?" : "New user?"}{" "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 cursor-pointer font-semibold ml-1 hover:underline"
            >
              {" "}
              {isSignup ? "Login" : "Sign Up"}{" "}
            </span>{" "}
          </p>{" "}
        </form>{" "}
      </div>
    </>
  );
};

export default Auth;
