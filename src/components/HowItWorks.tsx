
import { Search, Stethoscope, Phone } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Como Funciona
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#1780FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Busque</h3>
            <p className="text-gray-600">
              Procure por especialidade, localização ou nome do profissional
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Compare</h3>
            <p className="text-gray-600">
              Veja avaliações, especialidades e informações detalhadas
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Agende</h3>
            <p className="text-gray-600">
              Entre em contato e marque sua consulta diretamente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
