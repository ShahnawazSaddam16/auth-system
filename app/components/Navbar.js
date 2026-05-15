"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_ORIGIN}/auth/me`, {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return null;

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

const handleLogout = async () => {
  await fetch(`${API_ORIGIN}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  setUser(null);
  setMenuOpen(false);

  window.location.href = "/";
};

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          My App
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => router.push("/")} className="text-sm hover:text-blue-400">
            Home
          </button>
          <button onClick={() => router.push("/about")} className="text-sm hover:text-blue-400">
            About
          </button>
          <button onClick={() => router.push("/dashboard")} className="text-sm hover:text-blue-400">
            Dashboard
          </button>

          {user ? (
            <>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold cursor-pointer">
                {initials}
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-red-400 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/Auth")}
              className="text-sm text-blue-400 hover:underline"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-b border-slate-800 bg-black">
          <button onClick={() => router.push("/")}>Home</button>
          <button onClick={() => router.push("/about")}>About</button>
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>

          {user ? (
            <>
              <div className="block m-auto">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  {initials}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/Auth")}
              className="text-blue-400"
            >
              Login
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;