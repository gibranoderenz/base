import React, { createContext, useContext, useState } from "react";
import {
  SupaCoachExpertInterface,
  SupaCoachExpertProviderProps,
} from "./interface";
import { AdvisorProps } from "@/components/modules/SupaCoachExpertModule/interface";

const SupaCoachExpertContext = createContext({} as SupaCoachExpertInterface);

export const useSupaCoachExpertContext = () =>
  useContext(SupaCoachExpertContext);

export const SupaCoachExpertProvider: React.FC<
  SupaCoachExpertProviderProps
> = ({ children }) => {
  const [page, setPage] = useState<"CHOOSE_ADVISOR" | "CHOOSE_SCHEDULE">(
    "CHOOSE_ADVISOR"
  );
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorProps | null>(
    null
  );

  const value = { page, setPage, selectedAdvisor, setSelectedAdvisor };

  return (
    <SupaCoachExpertContext.Provider value={value}>
      {children}
    </SupaCoachExpertContext.Provider>
  );
};
