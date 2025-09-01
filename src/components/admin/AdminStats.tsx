
import { Users, Clock, Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminStatsProps {
  stats: {
    totalDoctors: number;
    pendingApproval: number;
    featuredDoctors: number;
    pendingMessages: number;
  };
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-6 text-center">
          <Users className="w-8 h-8 sm:w-12 sm:h-12 text-[#1780FF] mx-auto mb-2 sm:mb-3" />
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{stats.totalDoctors}</h3>
          <p className="text-xs sm:text-sm text-gray-600">Profissionais Ativos</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-6 text-center">
          <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-[#F97316] mx-auto mb-2 sm:mb-3" />
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{stats.pendingApproval}</h3>
          <p className="text-xs sm:text-sm text-gray-600">Aguardando Aprovação</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-6 text-center">
          <Star className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{stats.featuredDoctors}</h3>
          <p className="text-xs sm:text-sm text-gray-600">Em Destaque</p>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-6 text-center">
          <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-2 sm:mb-3" />
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{stats.pendingMessages}</h3>
          <p className="text-xs sm:text-sm text-gray-600">Mensagens Pendentes</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
