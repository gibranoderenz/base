import { SupaCoachExpertProvider } from "@/components/contexts/SupaCoachExpertContext";
import { SupaCoachExpertModule } from "@/components/modules";
import React from "react";

const SupaCoachExpertPage = () => {
  return (
    <SupaCoachExpertProvider>
      <SupaCoachExpertModule />
    </SupaCoachExpertProvider>
  );
};

export default SupaCoachExpertPage;
