import { useSupaCoachExpertContext } from "@/components/contexts";
import { ChooseAdvisorSection, ChooseScheduleSection } from "./sections";

export const SupaCoachExpertModule = () => {
  const { page } = useSupaCoachExpertContext();

  if (page === "CHOOSE_ADVISOR") return <ChooseAdvisorSection />;
  return <ChooseScheduleSection />;
};
