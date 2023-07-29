import { AdvisorProps } from "@/components/modules/SupaCoachExpertModule/interface";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface SupaCoachExpertInterface {
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
  selectedAdvisor: AdvisorProps | null;
  setSelectedAdvisor: Dispatch<SetStateAction<AdvisorProps | null>>;
}

export interface SupaCoachExpertProviderProps {
  children: ReactNode;
}

export type PageType = "CHOOSE_ADVISOR" | "CHOOSE_SCHEDULE";
