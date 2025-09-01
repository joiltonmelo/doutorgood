
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Share2, Copy, Calendar, Clock, Award, Stethoscope, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useProfessional } from "@/hooks/useProfessional";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: doctor, isLoading, error } = useProfessional(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1780FF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil do profissional...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Profissional não encontrado</h2>
          <p className="text-gray-500 mb-4">O profissional que você está procurando não foi encontrado ou não está disponível.</p>
          <Button onClick={() => navigate("/search")} className="bg-[#1780FF] hover:bg-[#1456CC]">
            Voltar à Busca
          </Button>
        </div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    if (!doctor.phone) {
      toast.error("Telefone não disponível para este profissional.");
      return;
    }
    const message = encodeURIComponent(`Olá, ${doctor.name}! Gostaria de agendar uma consulta. Vi seu perfil no DoutorGood.`);
    window.open(`https://wa.me/55${doctor.phone}?text=${message}`, '_blank');
  };

  const handleScheduleAppointment = () => {
    if (doctor.agenda_link) {
      window.open(doctor.agenda_link, '_blank');
    } else {
      toast.error("Link da agenda não disponível. Entre em contato via WhatsApp.");
    }
  };

  const handleShareProfile = () => {
    const url = window.location.href;
    const message = `Confira o perfil de ${doctor.name} no DoutorGood: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${doctor.name} - DoutorGood`,
        text: message,
        url: url
      });
    } else {
      const whatsappMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl max-md:text-lg font-bold text-gray-800">Perfil do Médico</h1>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShareProfile}
                className="hidden sm:flex"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 mx-auto md:mx-0 mb-3 md:mb-4 border-2 border-gray-200">
                    {doctor.image_url ? (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1780FF] flex items-center justify-center">
                        <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                    )}
                  </div>
                  {doctor.featured && (
                    <div className="flex justify-center md:justify-start">
                      <Badge className="bg-gradient-to-r from-orange-300 to-orange-400 text-black flex items-center px-3 py-1">
                        <Crown className="w-3 h-3 md:mr-1"/>
                        <span className="md:inline ml-1">Premium</span>
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4 mb-4">
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h1>
                      <p className="text-lg md:text-xl text-blue-600 font-semibold mb-1">{doctor.specialty}</p>
                      <p className="text-gray-600 text-sm md:text-base">{doctor.credential}</p>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <div className="flex items-center justify-center md:justify-end space-x-1 text-yellow-500 mb-2">
                        <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                        <span className="text-xl md:text-2xl font-bold text-gray-800">{doctor.rating || 0}</span>
                      </div>
                      <p className="text-gray-600 text-xs md:text-sm">Novo</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <Button 
                      onClick={handleWhatsAppContact}
                      disabled={!doctor.phone}
                      className="w-full md:w-fit bg-green-500 hover:bg-green-600 text-white h-10 md:h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Contatar via WhatsApp
                    </Button>
                    <Button 
                      onClick={handleScheduleAppointment}
                      disabled={!doctor.agenda_link}
                      variant="outline"
                      className="w-full md:w-fit border-blue-200 text-blue-600 hover:bg-blue-50 h-10 md:h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Agendar Consulta
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {doctor.bio && (
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Sobre o Profissional</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{doctor.bio}</p>
                  </CardContent>
                </Card>
              )}

              {/* Education */}
              {doctor.education && (
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Award className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Formação
                    </h2>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm md:text-base">{doctor.education}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Experience */}
              {doctor.experience && (
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Stethoscope className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Experiência Profissional</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">{doctor.experience}</p>
                  </CardContent>
                </Card>
              )}

              {/* Working Hours */}
              {doctor.working_hours && (
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                      Horários de Atendimento
                    </h2>
                    <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 text-sm md:text-base">{doctor.working_hours}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Informações de Contato</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 text-sm md:text-base">Localização</p>
                        <p className="text-gray-600 text-xs md:text-sm">{doctor.location}</p>
                      </div>
                    </div>
                    
                    {doctor.phone && (
                      <>
                        <Separator />
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800 text-sm md:text-base">Telefone</p>
                            <p className="text-gray-600 text-sm md:text-base">{doctor.phone}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {doctor.agenda_link && (
                      <>
                        <Separator />
                        <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                          <p className="text-blue-800 font-medium text-xs md:text-sm">📅 Agenda online disponível</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Health Plans */}
              {doctor.health_plans && doctor.health_plans.length > 0 && (
                <Card className="border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Convênios Atendidos</h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.health_plans.map((plan) => (
                        <Badge key={plan} variant="secondary" className="text-xs">
                          {plan}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Share */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm sm:hidden">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Compartilhar</h3>
                  <Button
                    onClick={handleShareProfile}
                    variant="outline"
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar Perfil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
