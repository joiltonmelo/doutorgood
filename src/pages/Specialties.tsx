
import { useState } from "react";
import { Search, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const Specialties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const allSpecialties = [
 "Cardiologista", "Dermatologista", "Ginecologista", "Neurologista",
"Pediatra", "Psiquiatra", "Ortopedista", "Oftalmologista",
"Endocrinologista", "Gastroenterologista", "Urologista", "Otorrinolaringologista",
"Odontologista", "Anestesiologista", "Cirurgião Geral", "Cirurgião Plástico",
"Clínico Geral", "Médico do Trabalho", "Médico Esportivo",
"Médico de Família", "Infectologista", "Oncologista", "Radiologista",
"Patologista", "Médico Nuclear", "Reumatologista", "Geriatra",
"Hematologista", "Nefrologista", "Pneumologista", "Proctologista",
"Intensivista", "Legista", "Médico Preventivo",
"Acupunturista", "Homeopata", "Nutrólogo", "Médico Estético"
  ];

  const filteredSpecialties = allSpecialties.filter(specialty =>
    specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpecialtyClick = (specialty: string) => {
    navigate(`/search?specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
                alt="Doutor Good Logo" 
                className="h-5 w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <button 
              onClick={() => navigate("/")}
              className="text-[#1780FF] hover:text-[#1456CC] font-medium"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Especialidades Médicas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Encontre profissionais especializados em diversas áreas da medicina
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSpecialties.map((specialty) => (
              <Card 
                key={specialty} 
                className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                onClick={() => handleSpecialtyClick(specialty)}
              >
                <CardContent className="p-6 text-center">
                  <Stethoscope className="w-8 h-8 text-[#1780FF] mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800">{specialty}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSpecialties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma especialidade encontrada.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Specialties;
