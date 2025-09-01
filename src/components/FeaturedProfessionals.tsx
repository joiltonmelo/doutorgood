
import { MapPin, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useFeaturedProfessionals } from "@/hooks/useFeaturedProfessionals";

const FeaturedProfessionals = () => {
  const navigate = useNavigate();
  const { data: featuredProfessionals = [], isLoading } = useFeaturedProfessionals();

  const handleContact = (doctor: any) => {
    const message = `Olá ${doctor.name}, gostaria de agendar uma consulta.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSchedule = (doctor: any) => {
    if (doctor.agenda_link) {
      window.open(doctor.agenda_link, '_blank');
    } else {
      handleContact(doctor);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Profissionais em Destaque
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Carregando profissionais...</div>
          </div>
        ) : featuredProfessionals.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Nenhum profissional em destaque no momento</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProfessionals.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow border border-gray-200 relative">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-300 to-orange-400 text-black z-10 flex items-center">
                  <Crown className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline text-xs">Premium</span>
                </Badge>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                      <img 
                        src={doctor.image_url || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                      <p className="text-[#1780FF] font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-gray-600">{doctor.credential}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">{doctor.rating || "4.5"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-500" />
                      {doctor.location}
                    </div>
                    {doctor.health_plans && doctor.health_plans.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-4 h-4 mr-2 mb-1 flex items-center">💳</span>
                        {doctor.health_plans.slice(0, 2).join(", ")}
                        {doctor.health_plans.length > 2 && " +"}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button 
                      onClick={() => navigate(`/profile/${doctor.id}`)}
                      className="w-full bg-[#1780FF] hover:bg-[#1456CC] text-white"
                    >
                      Ver Perfil
                    </Button>
                    <Button 
                      onClick={() => handleSchedule(doctor)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      {doctor.agenda_link ? "Agendar Consulta" : "Contato"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
