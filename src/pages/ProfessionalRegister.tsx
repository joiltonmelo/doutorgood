
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProfessionalRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    registration: "",
    city: "",
    neighborhood: "",
    phone: "",
    email: "",
    bio: "",
    address: "",
    onlineConsultation: false,
    agendaLink: "",
    healthPlans: [] as string[],
    education: "",
    experience: "",
    workingHours: "",
  });
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

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

  const healthPlans = [
    "Unimed", "Bradesco Saúde", "Amil", "SulAmérica", "Mediservice", "Omint",
    "NotreDame Intermédica", "Porto Seguro", "Prevent Senior", "Saúde Caixa", "Allianz", "Particular"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHealthPlanToggle = (plan: string) => {
    setFormData(prev => ({
      ...prev,
      healthPlans: prev.healthPlans.includes(plan)
        ? prev.healthPlans.filter(p => p !== plan)
        : [...prev.healthPlans, plan]
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePremiumUpgrade = () => {
    window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084977bbd93019780aba19d0212', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.specialty || !formData.registration || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar dados para inserção
      const location = `${formData.city}${formData.neighborhood ? `, ${formData.neighborhood}` : ''}`;
      
      // Verificar se há usuário logado
      const { data: { user } } = await supabase.auth.getUser();
      
      const professionalData = {
        name: formData.name,
        specialty: formData.specialty,
        credential: formData.registration,
        education: formData.education || null,
        experience: formData.experience || null,
        location: location,
        phone: formData.phone,
        email: formData.email || null,
        bio: formData.bio || null,
        agenda_link: formData.agendaLink || null,
        health_plans: formData.healthPlans,
        status: 'pending',
        featured: false,
        user_id: user?.id || null // Vincular ao usuário se estiver logado
      };

      console.log("Inserindo profissional:", professionalData);

      const { data, error } = await supabase
        .from('professionals')
        .insert(professionalData)
        .select()
        .single();

      if (error) {
        console.error("Erro ao cadastrar profissional:", error);
        toast.error("Erro ao enviar cadastro. Tente novamente.");
        return;
      }

      console.log("Profissional cadastrado com sucesso:", data);
      
      if (user) {
        toast.success("Cadastro enviado com sucesso! Redirecionando para seu painel...");
        navigate("/medico/painel");
      } else {
        toast.success("Cadastro enviado com sucesso! Seu perfil será analisado em até 48 horas.");
        navigate("/");
      }
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
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Cadastro Médico</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Premium Banner */}
          <Card className="border-0 bg-gradient-to-r from-orange-300 to-orange-400 text-black mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">Torne-se Premium!</h3>
                    <p className="text-sm opacity-90">
                      Apareça em destaque nas buscas e tenha mais visibilidade
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={() => navigate("/premium")} 
                    className="bg-gray-50 hover:bg-gray-100 text-black font-semibold"
                  >
                    Ver Benefícios
                  </Button>
                  <Button 
                    onClick={handlePremiumUpgrade}
                    className="bg-gray-950 hover:bg-gray-900 text-white font-semibold"
                  >
                    Premium - R$ 29,90/mês
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <Label htmlFor="registration">Registro Profissional *</Label>
                    <Input
                      id="registration"
                      value={formData.registration}
                      onChange={(e) => handleInputChange("registration", e.target.value)}
                      placeholder="Ex: CRM 12345/SP"
                      className="border-blue-200 focus:border-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Tel: (11) 99999-9999 or WhatsLink 11999999999 "
                    className="border-blue-200 focus:border-blue-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="agendaLink">Link da Agenda Online</Label>
                  <Input
                    id="agendaLink"
                    value={formData.agendaLink}
                    onChange={(e) => handleInputChange("agendaLink", e.target.value)}
                    placeholder="Ex: https://calendly.com/seuperfil ou link do Doctoralia"
                    className="border-blue-200 focus:border-blue-400"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Adicione o link da sua agenda online (Calendly, Doctoralia, etc.) para facilitar o agendamento
                  </p>
                </div>

                <div>
                  <Label htmlFor="bio">Sobre você (bio)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Conte um pouco sobre você.."
                    className="border-blue-200 focus:border-blue-400 min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="education">Formação</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder="Ex: Escola de Medicina Souza Marques"
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                  />
                </div>

                 <div>
                  <Label htmlFor="experience">Experiência Profissional</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Ex: Hemodinâmica e cardiologia intervencionista Hospital..."
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

                {/* Photo Upload */}
                <div>
                  <Label>Foto do Perfil</Label>
                  <div className="flex items-start space-x-4 mt-2">
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                          onClick={() => {
                            setPhoto(null);
                            setPhotoPreview("");
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("photo")?.click()}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Escolher Foto
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        Recomendado: Enviar link da foto por email de suporte!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Localização e Atendimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                      placeholder="Ex: Vila Madalena"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>

             <div className="flex items-center space-x-2">
                  <Checkbox
                    id="online"
                    checked={formData.onlineConsultation}
                    onCheckedChange={(checked) => handleInputChange("onlineConsultation", !!checked)}
                  />
                  <Label htmlFor="online">Atendo por telemedicina</Label>
                </div>
              </CardContent>
            </Card>

            {/* Health Plans */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Convênios Atendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {healthPlans.map((plan) => (
                    <div key={plan} className="flex items-center space-x-2">
                      <Checkbox
                        id={plan}
                        checked={formData.healthPlans.includes(plan)}
                        onCheckedChange={() => handleHealthPlanToggle(plan)}
                      />
                      <Label htmlFor={plan} className="text-sm">{plan}</Label>
                    </div>
                  ))}
                </div>
                
                {formData.healthPlans.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Convênios selecionados:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.healthPlans.map((plan) => (
                        <Badge key={plan} variant="secondary" className="text-xs">
                          {plan}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0 w-4 h-4"
                            onClick={() => handleHealthPlanToggle(plan)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    Ao enviar o cadastro, suas informações serão analisadas pela nossa equipe. 
                    Você receberá um retorno em até 48 horas.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="border-gray-300"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#1780FF] hover:bg-[#1456CC] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRegister;
