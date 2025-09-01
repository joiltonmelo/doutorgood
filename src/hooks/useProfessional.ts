
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfessional = (id: string) => {
  return useQuery({
    queryKey: ["professional", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .maybeSingle();

      if (error) {
        console.error("Error fetching professional:", error);
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
};
