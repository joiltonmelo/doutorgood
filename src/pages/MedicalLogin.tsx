
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Stethoscope, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMedicalAuth } from "@/hooks/useMedicalAuth";
import { toast } from "sonner";

const MedicalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useMedicalAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message || "Erro ao fazer login");
    } else {
      toast.success("Login realizado com sucesso!");
      navigate("/medico/painel");
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, {});
    
    if (error) {
      toast.error(error.message || "Erro ao criar conta");
    } else {
      toast.success("Conta criada! Complete seu cadastro profissional.");
      navigate("/medico/cadastro-completo");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <img 
              src="/lovable-uploads/7a400af4-a4bc-4ad6-957c-e1dd3d3cceae.png" 
              alt="Doutor Good Logo" 
              className="h-5 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              Área do Médico
            </h1>
          </div>

          <Card className="border border-gray-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <Stethoscope className="w-5 h-5 mr-2 text-[#1780FF]" />
                Acesso Médico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Entrar</TabsTrigger>
                  <TabsTrigger value="signup">Criar Conta</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-[#1780FF]"
                          placeholder="Digite seu e-mail"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Senha
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 border-gray-200 focus:border-[#1780FF]"
                          placeholder="Digite sua senha"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1780FF] hover:bg-[#1456CC] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 border-gray-200 focus:border-[#1780FF]"
                          placeholder="Digite seu e-mail"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                        Senha
                      </label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-200 focus:border-[#1780FF]"
                        placeholder="Digite sua senha"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                        Confirmar Senha
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-gray-200 focus:border-[#1780FF]"
                        placeholder="Confirme sua senha"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Não tem cadastro profissional ainda?</p>
                <Link 
                  to="/register" 
                  className="text-[#1780FF] hover:underline font-medium"
                >
                  Cadastre-se como profissional
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalLogin;
