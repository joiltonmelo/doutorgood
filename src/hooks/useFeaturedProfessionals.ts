
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useFeaturedProfessionals = () => {
  return useQuery({
    queryKey: ["featured-professionals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("featured", true)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching featured professionals:", error);
        throw error;
      }

      return data || [];
    },
  });
};
