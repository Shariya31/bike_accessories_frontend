'use client'
import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { data:user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/auth/login");
    }
  }, [isLoading, isError]);

  if (isLoading) return <h2>Loading...</h2>;

  return children;
};

export default ProtectedRoute;