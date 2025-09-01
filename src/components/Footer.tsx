
import { Heart, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-5 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
                alt="DoutorGood Logo" 
                className="h-6 sm:h-6 w-auto mr-3"
              />
            </div>
            <p className="text-gray-600 mb-4 max-w-md text-sm sm:text-base">
              Conectando você aos melhores profissionais de saúde. 
              Encontre médicos online qualificados de forma rápida e segura.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61578066434219" className="text-gray-400 hover:text-[#1780FF] transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1780FF] transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#1780FF] transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-sm sm:text-base">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/especialidades" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-orange-400 font-medium hover:text-orange-500 transition-colors text-sm">
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-sm sm:text-base">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacidade" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#1780FF] transition-colors text-sm font-medium">
                  suporte@doutorgood.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            © 2025 DoutorGood - Médicos Online.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm flex items-center">
            Feito com <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mx-1" fill="currentColor" /> para cuidar da sua saúde
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
