
import { Navigate } from "react-router-dom";
import { useMedicalAuth } from "@/hooks/useMedicalAuth";

interface MedicalProtectedRouteProps {
  children: React.ReactNode;
}

const MedicalProtectedRoute = ({ children }: MedicalProtectedRouteProps) => {
  const { user, isLoading } = useMedicalAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/medico/login" replace />;
  }

  return <>{children}</>;
};

export default MedicalProtectedRoute;
