import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const TermsOfService = () => {
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
                alt="Doutor GO Logo" 
                className="h-5 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-800">Termos de Uso</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Termos de Uso - Doutor GO</CardTitle>
              <p className="text-gray-600 text-center">Última atualização: Janeiro de 2025</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-3">1. Aceitação dos Termos</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ao acessar e usar a plataforma Doutor GO, você concorda em cumprir e estar vinculado aos presentes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">2. Descrição do Serviço</h3>
                <p className="text-gray-700 leading-relaxed">
                  O Doutor GO é uma plataforma digital que conecta pacientes a profissionais de saúde, facilitando a busca e agendamento de consultas. 
                  Não somos um prestador de serviços médicos, mas sim um intermediário tecnológico que facilita essa conexão.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">3. Responsabilidades dos Usuários</h3>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium">3.1 Pacientes</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Fornecer informações precisas e atualizadas</li>
                    <li>Respeitar os horários agendados</li>
                    <li>Tratar os profissionais com respeito</li>
                    <li>Não usar a plataforma para fins ilícitos</li>
                  </ul>
                  
                  <h4 className="text-lg font-medium">3.2 Profissionais de Saúde</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Possuir registro profissional válido</li>
                    <li>Manter informações do perfil atualizadas</li>
                    <li>Cumprir com os padrões éticos da profissão</li>
                    <li>Respeitar a privacidade dos pacientes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">4. Privacidade e Proteção de Dados</h3>
                <p className="text-gray-700 leading-relaxed">
                  Respeitamos sua privacidade e nos comprometemos a proteger suas informações pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD). 
                  Para mais detalhes, consulte nossa Política de Privacidade.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">5. Limitações de Responsabilidade</h3>
                <p className="text-gray-700 leading-relaxed">
                  O Doutor GO não se responsabiliza pelos serviços médicos prestados pelos profissionais cadastrados. 
                  Nossa responsabilidade se limita ao funcionamento da plataforma tecnológica. 
                  Qualquer questão relacionada ao atendimento médico deve ser tratada diretamente com o profissional.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">6. Uso Adequado da Plataforma</h3>
                <p className="text-gray-700 leading-relaxed">
                  É proibido usar a plataforma para:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                  <li>Atividades ilegais ou não autorizadas</li>
                  <li>Transmitir vírus ou códigos maliciosos</li>
                  <li>Violar direitos de terceiros</li>
                  <li>Fazer spam ou enviar comunicações não solicitadas</li>
                  <li>Interferir no funcionamento da plataforma</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">7. Propriedade Intelectual</h3>
                <p className="text-gray-700 leading-relaxed">
                  Todos os direitos de propriedade intelectual relacionados à plataforma Doutor GO são de nossa propriedade ou licenciados para nós. 
                  O uso da plataforma não concede aos usuários nenhum direito de propriedade sobre nosso conteúdo.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">8. Modificações dos Termos</h3>
                <p className="text-gray-700 leading-relaxed">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações serão comunicadas através da plataforma e entrarão em vigor na data especificada.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">9. Rescisão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Podemos suspender ou encerrar sua conta a qualquer momento, com ou sem aviso prévio, 
                  se você violar estes termos ou se considerarmos que seu uso da plataforma é prejudicial.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">10. Lei Aplicável</h3>
                <p className="text-gray-700 leading-relaxed">
                  Estes termos são regidos pelas leis brasileiras. 
                  Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">11. Contato</h3>
                <p className="text-gray-700 leading-relaxed">
                  Para dúvidas sobre estes Termos de Uso, entre em contato conosco através dos canais disponíveis na plataforma.
                </p>
              </section>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Ao continuar usando o Doutor GO, você confirma que leu, compreendeu e concorda com estes Termos de Uso.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;