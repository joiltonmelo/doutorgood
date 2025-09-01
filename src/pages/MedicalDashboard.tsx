
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Save, X, Stethoscope, Phone, Mail, MapPin } from "lucide-react";
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
import { useMedicalAuth } from "@/hooks/useMedicalAuth";

const MedicalDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useMedicalAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [professional, setProfessional] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    credential: "",
    location: "",
    phone: "",
    email: "",
    bio: "",
    agenda_link: "",
    health_plans: [] as string[],
    education: "",
    workingHours: "",
    onlineConsultation: false,
  });

  const specialties = [
    "Cardiologia", "Dermatologia", "Ginecologia", "Neurologia",
    "Pediatria", "Psiquiatria", "Ortopedia", "Oftalmologia",
    "Endocrinologia", "Gastroenterologia", "Urologia", "Otorrinolaringologia",
    "Odontologia"
  ];

  const healthPlans = [
    "Unimed", "Bradesco Saúde", "Amil", "SulAmérica",
    "NotreDame Intermédica", "Porto Seguro", "Prevent Senior", "Particular"
  ];

  useEffect(() => {
    fetchProfessionalData();
  }, [user]);

  const fetchProfessionalData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('professionals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados do profissional:", error);
        if (error.code === 'PGRST116') {
          // Não encontrou cadastro, redirecionar para completar cadastro
          navigate("/medico/cadastro-completo");
          return;
        }
      } else {
        setProfessional(data);
        setFormData({
          name: data.name || "",
          specialty: data.specialty || "",
          credential: data.credential || "",
          location: data.location || "",
          phone: data.phone || "",
          email: data.email || "",
          bio: data.bio || "",
          agenda_link: data.agenda_link || "",
          health_plans: data.health_plans || [],
          education: data.education || "",
          workingHours: data.working_hours || "",
          onlineConsultation: (data as any).online_consultation || false,
        });
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const handleSave = async () => {
    if (!user || !professional) return;

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('professionals')
        .update({
          name: formData.name,
          specialty: formData.specialty,
          credential: formData.credential,
          location: formData.location,
          phone: formData.phone,
          email: formData.email,
          bio: formData.bio,
          agenda_link: formData.agenda_link,
          health_plans: formData.health_plans,
          education: formData.education,
          working_hours: formData.workingHours,
          online_consultation: formData.onlineConsultation,
          updated_at: new Date().toISOString()
        })
        .eq('id', professional.id);

      if (error) {
        console.error("Erro ao atualizar perfil:", error);
        toast.error("Erro ao salvar alterações");
      } else {
        toast.success("Perfil atualizado com sucesso!");
        setIsEditing(false);
        fetchProfessionalData();
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro inesperado ao salvar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Carregando dados...</div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Aguardando Aprovação</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
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
                alt="Doutor GO Logo" 
                className="h-6 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-800">Meu Perfil Profissional</h1>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Card */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Stethoscope className="w-8 h-8 text-[#1780FF]" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{professional?.name}</h2>
                    <p className="text-gray-600">{professional?.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(professional?.status)}
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="bg-[#1780FF] hover:bg-[#1456CC]"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Salvando..." : "Salvar"}
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsEditing(false);
                          fetchProfessionalData();
                        }}
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border">{professional?.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {professional?.email || "Não informado"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialty">Especialidade</Label>
                  {isEditing ? (
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
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border">{professional?.specialty}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="credential">Registro Profissional</Label>
                  {isEditing ? (
                    <Input
                      id="credential"
                      value={formData.credential}
                      onChange={(e) => handleInputChange("credential", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border">{professional?.credential}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      {professional?.phone || "Não informado"}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Localização</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded border flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {professional?.location || "Não informado"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="education">Formação</Label>
                {isEditing ? (
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                    placeholder="Ex: Graduação em Medicina pela USP, Residência em Cardiologia pelo InCor..."
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border min-h-16">
                    {professional?.education || "Não informado"}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="workingHours">Horários de Atendimento</Label>
                {isEditing ? (
                  <Textarea
                    id="workingHours"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange("workingHours", e.target.value)}
                    className="border-blue-200 focus:border-blue-400 min-h-20"
                    placeholder="Ex: Segunda a Sexta: 8h às 18h, Sábado: 8h às 12h"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border min-h-16">
                    {professional?.working_hours || "Não informado"}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="agenda_link">Link da Agenda Online</Label>
                {isEditing ? (
                  <Input
                    id="agenda_link"
                    value={formData.agenda_link}
                    onChange={(e) => handleInputChange("agenda_link", e.target.value)}
                    className="border-blue-200 focus:border-blue-400"
                    placeholder="Ex: https://calendly.com/seuperfil"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded border">
                    {professional?.agenda_link ? (
                      <a href={professional.agenda_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {professional.agenda_link}
                      </a>
                    ) : (
                      "Não informado"
                    )}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Sobre você (bio)</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="border-blue-200 focus:border-blue-400 min-h-24"
                    placeholder="Conte um pouco sobre sua experiência..."
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded border min-h-16">
                    {professional?.bio || "Não informado"}
                  </p>
                )}
              </div>

              {/* Health Plans */}
              <div>
                <Label>Convênios Atendidos</Label>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
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
                ) : (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {professional?.health_plans?.length > 0 ? (
                      professional.health_plans.map((plan: string) => (
                        <Badge key={plan} variant="secondary" className="text-xs">
                          {plan}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">Nenhum convênio informado</p>
                     )}
                   </div>
                 )}
               </div>

               {/* Atendimento por Telemedicina */}
               <div className="flex items-center space-x-2">
                 {isEditing ? (
                   <>
                     <Checkbox
                       id="onlineConsultation"
                       checked={formData.onlineConsultation}
                       onCheckedChange={(checked) => handleInputChange("onlineConsultation", checked)}
                     />
                     <Label htmlFor="onlineConsultation">Atendo por telemedicina</Label>
                   </>
                 ) : (
                   <div className="p-2 bg-gray-50 rounded border">
                     <div className="flex items-center space-x-2">
                       <Checkbox
                         checked={(professional as any)?.online_consultation || false}
                         disabled
                       />
                       <span className="text-sm">
                         {(professional as any)?.online_consultation ? 'Atende por telemedicina' : 'Não atende por telemedicina'}
                       </span>
                     </div>
                   </div>
                 )}
               </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
