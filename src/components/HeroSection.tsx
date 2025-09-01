
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import SpecialtyShortcuts from "./SpecialtyShortcuts";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedSpecialty) params.append('specialty', selectedSpecialty);
    
    navigate(`/search?${params.toString()}`);
  };

  const specialties = [
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

  const cities = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Bahia",
    "Brasília", "Fortaleza", "Curitiba", "Recife", "Porto Alegre", "Goiânia"
  ];

  return (
    <section className="bg-[#1780FF] text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Escolha Seu Médico
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Conectamos você aos melhores profissionais da saúde
        </p>
        
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar médico ou especialidade"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 text-gray-800"
              />
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="border-gray-200 text-gray-800">
                <SelectValue placeholder="Especialidade" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="border-gray-200 text-gray-800">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleSearch}
              className="bg-[#F97216] hover:bg-[#EA580C] text-white transition duration-500 w-full justify-self-center"
            >
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>

          <SpecialtyShortcuts />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
