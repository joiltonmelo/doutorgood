
import { useState } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="z-50 sticky top-0 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
              alt="DoutorGood Logo" 
              className="h-6 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/register")}
              className="text-gray-600 hover:text-[#1780FF]"
            >
              <Stethoscope className="w-4 h-4" />
              Cadastro Médico
            </Button>
         
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate("/register");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start text-gray-600 hover:text-[#1780FF]"
              >
                <Stethoscope className="w-4 h-4" />
                Cadastro Médico
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
