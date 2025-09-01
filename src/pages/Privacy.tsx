
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
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
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-[#1780FF] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Política de Privacidade
            </h1>
            <p className="text-lg text-gray-600">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#1780FF]" />
                  Coleta de Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  Coletamos informações que você nos fornece diretamente, como:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Nome, e-mail e telefone para cadastro</li>
                  <li>Informações profissionais (para médicos)</li>
                  <li>Preferências de busca e localização</li>
                  <li>Dados de navegação para melhorar nossos serviços</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#F97316]" />
                  Como Usamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Conectar pacientes aos profissionais adequados</li>
                  <li>Melhorar nossos serviços e funcionalidades</li>
                  <li>Enviar comunicações relevantes (com seu consentimento)</li>
                  <li>Garantir a segurança da plataforma</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-green-500" />
                  Proteção de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  Implementamos medidas de segurança rigorosas:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Criptografia de dados sensíveis</li>
                  <li>Acesso restrito às informações</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups seguros e regulares</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-800">Seus Direitos</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>
                  De acordo com a LGPD, você tem direito a:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir informações incompletas ou incorretas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar seu consentimento a qualquer momento</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-800">Contato</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p className="mb-4">
                  Para dúvidas sobre esta política ou exercer seus direitos, entre em contato:
                </p>
                <p>
                  <strong>E-mail:</strong> suporte@doutorgood.com.br<br />
                  <strong>Telefone:</strong> (11) 1234-5555 (Estamos trabalhando nisso!)
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate("/")}
              className="bg-[#1780FF] hover:bg-[#1456CC] text-white"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
