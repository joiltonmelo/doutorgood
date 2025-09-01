
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="p-1 sm:p-2"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <img 
              src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
              alt="Doutor GO Logo" 
              className="h-4 sm:h-5 w-auto"
            />
            <h1 className="text-sm sm:text-xl font-bold text-gray-800 hidden sm:block">Painel Administrativo</h1>
            <h1 className="text-sm font-bold text-gray-800 sm:hidden">Admin</h1>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
