
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { MedicalAuthProvider } from "@/hooks/useMedicalAuth";
import Index from "./pages/Index";
import ProfessionalRegister from "./pages/ProfessionalRegister";
import SearchResults from "./pages/SearchResults";
import DoctorProfile from "./pages/DoctorProfile";
import Specialties from "./pages/Specialties";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Premium from "./pages/Premium";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import MedicalLogin from "./pages/MedicalLogin";
import MedicalDashboard from "./pages/MedicalDashboard";
import MedicalRegisterComplete from "./pages/MedicalRegisterComplete";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import ProtectedRoute from "./components/ProtectedRoute";
import MedicalProtectedRoute from "./components/MedicalProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MedicalAuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<ProfessionalRegister />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/profile/:id" element={<DoctorProfile />} />
                <Route path="/especialidades" element={<Specialties />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/termos" element={<TermsOfService />} />
                <Route path="/premium" element={<Premium />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Medical Routes */}
                <Route path="/medico/login" element={<MedicalLogin />} />
                <Route 
                  path="/medico/painel" 
                  element={
                    <MedicalProtectedRoute>
                      <MedicalDashboard />
                    </MedicalProtectedRoute>
                  } 
                />
                <Route 
                  path="/medico/cadastro-completo" 
                  element={
                    <MedicalProtectedRoute>
                      <MedicalRegisterComplete />
                    </MedicalProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </MedicalAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
