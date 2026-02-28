"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user info using cookie-based auth
    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include", // <-- important to send cookies automatically
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

  return (
    <div>
      <main className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        {user ? (
          <h2 className="text-3xl font-bold">
            Welcome back, <span className="text-blue-400">{user.name}</span> 👋
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Welcome Guest 👋</h2>
            <p className="text-slate-400 mt-2">
              Please{" "}
              <span
                className="text-blue-400 font-semibold cursor-pointer"
                onClick={() => router.push("/auth")}
              >
                Login
              </span>{" "}
              to continue
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default Hero;