
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Crown, TrendingUp, Search, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const Premium = () => {
  const navigate = useNavigate();

  const handlePremiumUpgrade = () => {
    window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c938084977bbd93019780aba19d0212', '_blank');
  };

  const benefits = [
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Destaque em Todas as Buscas",
      description: "Seu perfil aparece no topo dos resultados de busca, garantindo máxima visibilidade"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Carrossel da Homepage",
      description: "Apareça na seção de profissionais em destaque da página inicial"
    },
    {
      icon: <Search className="w-8 h-8 text-blue-500" />,
      title: "Badge Premium",
      description: "Distintivo especial que demonstra sua qualidade e profissionalismo"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Prioridade nos Contatos",
      description: "Pacientes veem seu perfil primeiro, aumentando suas chances de consultas"
    }
  ];

  const features = [
    "Aparece em DESTAQUE em todas as buscas",
    "Badge premium visível em seu perfil",
    "Rotação automática na homepage",
    "Prioridade nos resultados por região",
    "Análise preferencial do cadastro",
    "Suporte prioritário",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
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
              alt="DoutorGood Logo" 
              className="h-5 w-auto"
            />
            <h1 className="text-xl font-bold text-gray-800">Premium</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-300 to-orange-400 text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <Crown className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            DoutorGood Premium
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Destaque-se e aumente sua visibilidade profissional
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto mb-8">
            <p className="text-3xl font-bold">R$ 29,90</p>
            <p className="text-lg opacity-90">por mês</p>
          </div>

          <Button 
            onClick={handlePremiumUpgrade}
            size="lg"
            className="bg-gray-950 text-white hover:bg-gray-900 font-semibold text-lg px-8 py-4"
          >
            Assinar Agora
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Benefícios do Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              O que está incluído
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Compare os Planos
          </h2>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plano Gratuito */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Plano Gratuito</CardTitle>
                <p className="text-3xl font-bold text-gray-600">R$ 0</p>
                <p className="text-gray-500">por mês</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cadastro básico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Aparece nas buscas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Perfil público</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Contato direto</span>
                </div>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-2 border-orange-400 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-300 to-orange-400 text-gray-950 px-4 py-1 text-xs font-bold">
                RECOMENDADO
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-orange-600">Plano Premium</CardTitle>
                <p className="text-3xl font-bold text-orange-600">R$ 29,90</p>
                <p className="text-gray-500">por mês</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Todos os benefícios gratuitos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Destaque em todas as buscas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Badge Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Carrossel da homepage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Prioridade nos resultados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Suporte prioritário</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-orange-300 to-orange-400 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para se destacar?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Comece a receber mais pacientes hoje mesmo
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={handlePremiumUpgrade}
              size="lg"
              className="bg-gray-950 text-white hover:bg-gray-900 font-semibold text-lg px-8 py-4"
            >
              Assinar Premium - R$ 29,90/mês
            </Button>
            
            <p className="text-sm opacity-90">
              Cancele a qualquer momento • Sem taxa de adesão
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Premium;
