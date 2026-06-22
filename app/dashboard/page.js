"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../components/context/AuthContext";

export const Dashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Dashboard;