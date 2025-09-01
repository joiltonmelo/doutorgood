
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Phone, Clock, CreditCard, Filter, Stethoscope, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Footer from "@/components/Footer";
import { useProfessionals } from "@/hooks/useProfessionals";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || "");
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || "");
  const [selectedHealthPlan, setSelectedHealthPlan] = useState(searchParams.get('healthPlan') || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: professionals = [], isLoading } = useProfessionals();

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
    "Brasília", "Fortaleza", "Curitiba", "Recife"
  ];

  const healthPlans = [
    "Unimed", "Bradesco Saúde", "Amil", "SulAmérica", 
    "NotreDame Intermédica", "Particular"
  ];

  // Filter only approved professionals
  const approvedProfessionals = professionals.filter(professional => 
    professional.status === 'approved'
  );

  const filteredDoctors = approvedProfessionals.filter(doctor => {
    const matchesSearch = !searchTerm || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !selectedCity || doctor.location.includes(selectedCity);
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesHealthPlan = !selectedHealthPlan || 
      (doctor.health_plans && doctor.health_plans.includes(selectedHealthPlan));
    
    return matchesSearch && matchesCity && matchesSpecialty && matchesHealthPlan;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedSpecialty) params.append('specialty', selectedSpecialty);
    if (selectedHealthPlan) params.append('healthPlan', selectedHealthPlan);
    
    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedSpecialty("");
    setSelectedHealthPlan("");
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img 
                src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
                alt="Doutor Good Logo" 
                className="h-5 w-auto"
              />
              <span className="text-xl font-bold text-gray-800">Busca</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar médico ou especialidade"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full sm:w-48 border-gray-200">
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
                <SelectTrigger className="w-full sm:w-40 border-gray-200">
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
                className="bg-[#1780FF] hover:bg-[#1456CC] text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedHealthPlan} onValueChange={setSelectedHealthPlan}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue placeholder="Convênio Médico" />
                  </SelectTrigger>
                  <SelectContent>
                    {healthPlans.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Limpar Filtros
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Resultados da Busca
          </h2>
          <p className="text-gray-600">
            {isLoading ? "Carregando..." : `${filteredDoctors.length} profissionais encontrados`}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1780FF] mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando profissionais...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start space-x-4 flex-1">
                       <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                         {(doctor as any).profile_image_url || doctor.image_url ? (
                           <img 
                             src={(doctor as any).profile_image_url || doctor.image_url} 
                             alt={doctor.name}
                             className="w-full h-full object-cover"
                           />
                         ) : (
                           <div className="w-full h-full bg-[#1780FF] flex items-center justify-center">
                             <Stethoscope className="w-10 h-10 text-white" />
                           </div>
                         )}
                       </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                        <p className="text-[#1780FF] font-medium text-lg">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600 mb-2">{doctor.credential}</p>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(doctor.rating || 0) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {doctor.rating || 0} (Novo)
                          </span>
                        </div>
                        
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                           <div className="flex items-center text-gray-600">
                             <MapPin className="w-4 h-4 mr-2 text-green-500" />
                             {doctor.location}
                           </div>
                           {doctor.working_hours && (
                             <div className="flex items-center text-gray-600">
                               <Clock className="w-4 h-4 mr-2 text-[#F97316]" />
                               {doctor.working_hours}
                             </div>
                           )}
                           {doctor.health_plans && doctor.health_plans.length > 0 && (
                             <div className="flex items-center text-gray-600">
                               <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
                               {doctor.health_plans.join(", ")}
                             </div>
                           )}
                           {(doctor as any).online_consultation && (
                             <div className="flex items-center text-gray-600 font-medium">
                               <Stethoscope className="w-4 h-4 mr-2 text-blue-500" />
                               Telemedicina
                             </div>
                           )}
                         </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col gap-2 lg:w-40">
                      <Button 
                        onClick={() => navigate(`/profile/${doctor.id}`)}
                        className="flex-1 lg:w-full bg-[#1780FF] hover:bg-[#1456CC] text-white"
                      >
                        Ver Perfil
                      </Button>
                      {doctor.phone && (
                        <Button 
                          variant="outline"
                          onClick={() => {
                            const whatsappUrl = `https://wa.me/55${doctor.phone.replace(/\D/g, '')}?text=Olá! Gostaria de agendar uma consulta.`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="flex-1 lg:w-full border-[#1780FF] text-[#1780FF] hover:bg-[#1780FF] hover:text-white"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contato
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredDoctors.length === 0 && (
          <Card className="border border-gray-200">
            <CardContent className="p-12 text-center">
              <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros ou expandir sua busca
              </p>
              <Button 
                onClick={clearFilters}
                className="bg-[#1780FF] hover:bg-[#1456CC] text-white"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
