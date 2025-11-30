// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/Auth/useUserStore";
import type { ReactNode } from "react";

export function PrivateRoute({ children }: { children: ReactNode  }) {
  const { user } = useUserStore();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
