
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useMedicalAuth } from "@/hooks/useMedicalAuth";

const MedicalRegisterComplete = () => {
  const navigate = useNavigate();
  const { user } = useMedicalAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    credential: "",
    location: "",
    experience: "",
    phone: "",
    bio: "",
    agenda_link: "",
    health_plans: [] as string[],
    education: "",
    workingHours: "",
    onlineConsultation: false,
    profileImage: null as File | null,
  });

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

  const healthPlans = [
    "Unimed", "Bradesco Saúde", "Amil", "SulAmérica", "Mediservice", "Omint",
    "NotreDame Intermédica", "Porto Seguro", "Prevent Senior", "Saúde Caixa", "Allianz", "Particular"
  ];

  useEffect(() => {
    if (!user) {
      navigate("/medico/login");
      return;
    }

    // Pre-fill email if available
    if (user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHealthPlanToggle = (plan: string) => {
    setFormData(prev => ({
      ...prev,
      health_plans: prev.health_plans.includes(plan)
        ? prev.health_plans.filter(p => p !== plan)
        : [...prev.health_plans, plan]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Por favor, faça login primeiro");
      return;
    }

    if (!formData.name || !formData.specialty || !formData.credential || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      let profileImageUrl = null;
      
      // Upload da imagem se fornecida
      if (formData.profileImage) {
        const fileExt = formData.profileImage.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('professional-photos')
          .upload(fileName, formData.profileImage);

        if (uploadError) {
          console.error("Erro ao fazer upload da imagem:", uploadError);
          toast.error("Erro ao fazer upload da imagem");
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('professional-photos')
          .getPublicUrl(uploadData.path);
        
        profileImageUrl = publicUrl;
      }

      const professionalData = {
        name: formData.name,
        specialty: formData.specialty,
        credential: formData.credential,
        experience: formData.experience || null,
        education: formData.education || null,
        location: formData.location,
        phone: formData.phone,
        email: user.email,
        bio: formData.bio || null,
        agenda_link: formData.agenda_link || null,
        health_plans: formData.health_plans,
        online_consultation: formData.onlineConsultation,
        profile_image_url: profileImageUrl,
        user_id: user.id,
        status: 'pending',
        featured: false
      };

      console.log("Cadastrando profissional:", professionalData);

      const { data, error } = await supabase
        .from('professionals')
        .insert(professionalData)
        .select()
        .single();

      if (error) {
        console.error("Erro ao cadastrar profissional:", error);
        toast.error("Erro ao completar cadastro. Tente novamente.");
        return;
      }

      console.log("Profissional cadastrado com sucesso:", data);
      toast.success("Cadastro completo! Redirecionando para seu painel...");
      navigate("/medico/painel");
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/medico/login")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Stethoscope className="w-6 h-6 text-[#1780FF]" />
            <h1 className="text-xl font-bold text-gray-800">Complete seu Cadastro Profissional</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
              <p className="text-gray-600">Complete seu perfil para começar a receber pacientes</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Ex: Dr. João Silva"
                      className="border-blue-200 focus:border-blue-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialty">Especialidade *</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="Selecione sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((spec) => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="credential">Registro Profissional *</Label>
                    <Input
                      id="credential"
                      value={formData.credential}
                      onChange={(e) => handleInputChange("credential", e.target.value)}
                      placeholder="Ex: CRM 12345-SP"
                      className="border-blue-200 focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="border-blue-200 focus:border-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Cidade, Estado"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="education">Formação</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder="Ex: Graduação em Medicina pela USP, Residência em Cardiologia pelo InCor..."
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                  />
                </div>

                  <div>
                <Label htmlFor="experience">Experiência Profissinal</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Ex: Residência em Cardiologia pelo InCor..."
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="workingHours">Horários de Atendimento</Label>
                  <Textarea
                    id="workingHours"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange("workingHours", e.target.value)}
                    placeholder="Ex: Segunda a Sexta: 8h às 18h, Sábado: 8h às 12h"
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="agenda_link">Link da Agenda Online</Label>
                  <Input
                    id="agenda_link"
                    value={formData.agenda_link}
                    onChange={(e) => handleInputChange("agenda_link", e.target.value)}
                    placeholder="Ex: https://calendly.com/seuperfil"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Sobre você</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Conte um pouco sobre sua experiência e áreas de atuação..."
                    className="border-blue-200 focus:border-blue-400 min-h-24"
                  />
                </div>

                {/* Health Plans */}
                 <div>
                   <Label>Convênios Atendidos</Label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                     {healthPlans.map((plan) => (
                       <div key={plan} className="flex items-center space-x-2">
                         <Checkbox
                           id={plan}
                           checked={formData.health_plans.includes(plan)}
                           onCheckedChange={() => handleHealthPlanToggle(plan)}
                         />
                         <Label htmlFor={plan} className="text-sm">{plan}</Label>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Foto do Perfil */}
                 <div>
                   <Label htmlFor="profileImage">Foto do Perfil</Label>
                   <Input
                     id="profileImage"
                     type="file"
                     accept="image/*"
                     onChange={(e) => {
                       const file = e.target.files?.[0] || null;
                       handleInputChange("profileImage", file);
                     }}
                     className="border-blue-200 focus:border-blue-400"
                   />
                 </div>

                 {/* Atendimento por Telemedicina */}
                 <div className="flex items-center space-x-2">
                   <Checkbox
                     id="onlineConsultation"
                     checked={formData.onlineConsultation}
                     onCheckedChange={(checked) => handleInputChange("onlineConsultation", checked)}
                   />
                   <Label htmlFor="onlineConsultation">Atendo por telemedicina</Label>
                 </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/medico/login")}
                    disabled={isSubmitting}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#1780FF] hover:bg-[#1456CC] text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Salvando..." : "Completar Cadastro"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalRegisterComplete;
