
import { Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credential: string;
  location: string;
  updated_at: string;
  featured: boolean;
}

interface ApprovedDoctorsTabProps {
  approvedDoctors: Doctor[];
  onToggleFeatured: (doctorId: string, currentFeatured: boolean) => void;
  isTogglingFeatured: boolean;
}

const ApprovedDoctorsTab = ({ approvedDoctors, onToggleFeatured, isTogglingFeatured }: ApprovedDoctorsTabProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {approvedDoctors.map((doctor) => (
        <Card key={doctor.id} className="border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                  {doctor.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <p><strong>Especialidade:</strong> {doctor.specialty}</p>
                  <p><strong>Registro:</strong> {doctor.credential}</p>
                  <p><strong>Cidade:</strong> {doctor.location}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Aprovado em: {new Date(doctor.updated_at).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => navigate(`/profile/${doctor.id}`)}
                  variant="outline"
                  size="sm"
                  className="border-[#1780FF] text-[#1780FF] hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Perfil
                </Button>
                
                <Button 
                  onClick={() => onToggleFeatured(doctor.id, doctor.featured)}
                  variant={doctor.featured ? "default" : "outline"}
                  size="sm"
                  disabled={isTogglingFeatured}
                  className={doctor.featured 
                    ? "bg-[#F97316] hover:bg-orange-600 text-white" 
                    : "border-[#F97316] text-[#F97316] hover:bg-orange-50"
                  }
                >
                  <Star className="w-4 h-4 mr-2" />
                  {doctor.featured ? "Remover Destaque" : "Destacar"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApprovedDoctorsTab;
