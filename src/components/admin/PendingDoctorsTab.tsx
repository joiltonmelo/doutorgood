
import { Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credential: string;
  location: string;
  phone: string;
  email: string;
  created_at: string;
  bio?: string;
  health_plans?: string[];
}

interface PendingDoctorsTabProps {
  pendingDoctors: Doctor[];
  onApprove: (doctorId: string) => void;
  onReject: (doctorId: string) => void;
  isUpdating: boolean;
}

const PendingDoctorsTab = ({ pendingDoctors, onApprove, onReject, isUpdating }: PendingDoctorsTabProps) => {
  if (pendingDoctors.length === 0) {
    return (
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum cadastro pendente
          </h3>
          <p className="text-gray-600">
            Todos os cadastros foram processados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {pendingDoctors.map((doctor) => (
        <Card key={doctor.id} className="border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <p><strong>Especialidade:</strong> {doctor.specialty}</p>
                      <p><strong>Registro:</strong> {doctor.credential}</p>
                      <p><strong>Cidade:</strong> {doctor.location}</p>
                      <p><strong>Telefone:</strong> {doctor.phone}</p>
                      <p><strong>E-mail:</strong> {doctor.email}</p>
                      <p><strong>Enviado em:</strong> {new Date(doctor.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    
                    {doctor.bio && (
                      <div className="mb-3">
                        <p className="text-sm"><strong>Bio:</strong></p>
                        <p className="text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {doctor.health_plans?.map((plan) => (
                        <Badge key={plan} variant="secondary" className="text-xs">
                          {plan}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:w-32">
                <Button 
                  onClick={() => onApprove(doctor.id)}
                  size="sm"
                  disabled={isUpdating}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
                
                <Button 
                  onClick={() => onReject(doctor.id)}
                  variant="destructive"
                  size="sm"
                  disabled={isUpdating}
                >
                  <X className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PendingDoctorsTab;
