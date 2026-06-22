"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "./Auth/Auth";
import { useAuth } from "./Auth/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) router.push("/dashboard");
    }
  }, [loading, user, router]);

  return <Auth />;
}