
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useProfessionals, useUpdateProfessionalStatus, useToggleFeatured } from "@/hooks/useProfessionals";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import PendingDoctorsTab from "@/components/admin/PendingDoctorsTab";
import ApprovedDoctorsTab from "@/components/admin/ApprovedDoctorsTab";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const { data: professionals = [], isLoading } = useProfessionals();
  const updateStatusMutation = useUpdateProfessionalStatus();
  const toggleFeaturedMutation = useToggleFeatured();

  const pendingDoctors = professionals.filter(p => p.status === "pending");
  const approvedDoctors = professionals.filter(p => p.status === "approved");

  const stats = {
    totalDoctors: approvedDoctors.length,
    pendingApproval: pendingDoctors.length,
    featuredDoctors: approvedDoctors.filter(d => d.featured).length,
    pendingMessages: 0
  };

  const handleApprove = (doctorId: string) => {
    updateStatusMutation.mutate(
      { id: doctorId, status: "approved" },
      {
        onSuccess: () => {
          toast.success("Profissional aprovado com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao aprovar profissional");
        },
      }
    );
  };

  const handleReject = (doctorId: string) => {
    updateStatusMutation.mutate(
      { id: doctorId, status: "rejected" },
      {
        onSuccess: () => {
          toast.success("Cadastro rejeitado.");
        },
        onError: () => {
          toast.error("Erro ao rejeitar cadastro");
        },
      }
    );
  };

  const toggleFeatured = (doctorId: string, currentFeatured: boolean) => {
    toggleFeaturedMutation.mutate({
      id: doctorId,
      featured: !currentFeatured,
    });
  };

  const handleLogout = () => {
    logout();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <AdminHeader onLogout={handleLogout} />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <AdminStats stats={stats} />

        <Tabs defaultValue="pending" className="space-y-4 sm:space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm w-full sm:w-auto flex-col sm:flex-row h-auto sm:h-10 p-1">
            <TabsTrigger 
              value="pending" 
              className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white w-full sm:w-auto text-xs sm:text-sm"
            >
              Pendentes ({pendingDoctors.length})
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white w-full sm:w-auto text-xs sm:text-sm"
            >
              Aprovados ({approvedDoctors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <PendingDoctorsTab
              pendingDoctors={pendingDoctors}
              onApprove={handleApprove}
              onReject={handleReject}
              isUpdating={updateStatusMutation.isPending}
            />
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <ApprovedDoctorsTab
              approvedDoctors={approvedDoctors}
              onToggleFeatured={toggleFeatured}
              isTogglingFeatured={toggleFeaturedMutation.isPending}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
