
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Users, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Sobre o Doutor Good
          </h1>
          
          <div className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            <p>
              Somos uma plataforma dedicada a conectar pacientes aos melhores profissionais 
              da saúde, facilitando o acesso a cuidados médicos de qualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-[#1780FF] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso à saúde, conectando pacientes aos profissionais 
                  mais adequados às suas necessidades, de forma simples e eficiente.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-[#F97316] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Visão</h3>
                <p className="text-gray-600">
                  Ser a principal plataforma de conexão entre pacientes e profissionais 
                  da saúde no Brasil, promovendo cuidados médicos de excelência.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-gray-200 bg-white mb-12">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Shield className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Nossos Valores</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">Confiança</h4>
                  <p className="text-gray-600 text-sm">
                    Verificamos todos os profissionais para garantir credibilidade e segurança.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">Transparência</h4>
                  <p className="text-gray-600 text-sm">
                    Informações claras sobre especialidades, localização e convênios aceitos.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 mb-2">Acessibilidade</h4>
                  <p className="text-gray-600 text-sm">
                    Facilitamos o acesso aos cuidados de saúde para toda a população.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-[#1780FF] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Equipe</h3>
              <p className="text-gray-600 mb-6">
                Somos uma equipe apaixonada por tecnologia e saúde, trabalhando 
                incansavelmente para melhorar a experiência de pacientes e profissionais.
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-[#1780FF] hover:bg-[#1456CC] text-white"
              >
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
