
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfessionals = () => {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching professionals:", error);
        throw error;
      }

      return data || [];
    },
  });
};

export const useUpdateProfessionalStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("professionals")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating professional status:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      queryClient.invalidateQueries({ queryKey: ["featured-professionals"] });
    },
  });
};

export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const { data, error } = await supabase
        .from("professionals")
        .update({ featured, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error toggling featured status:", error);
        throw error;
      }

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["professionals"] });
      queryClient.invalidateQueries({ queryKey: ["featured-professionals"] });
      
      const message = variables.featured 
        ? "Profissional destacado com sucesso!" 
        : "Destaque removido com sucesso!";
      toast.success(message);
    },
    onError: (error) => {
      console.error("Error toggling featured status:", error);
      toast.error("Erro ao atualizar destaque do profissional");
    },
  });
};
