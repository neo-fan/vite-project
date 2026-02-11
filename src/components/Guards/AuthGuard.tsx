import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hook";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      const from = location.pathname + location.search;
      navigate(`/login?from=${encodeURIComponent(from)}`, { replace: true });
    }
  }, [token, navigate, location]);
  return <>{children}</>;
}