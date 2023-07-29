import { useSupaCoachExpertContext } from "@/components/contexts";
import {
  ChooseAdvisorSection,
  ChooseScheduleSection,
  ConfirmedSection,
} from "./sections";

export const SupaCoachExpertModule = () => {
  const { page } = useSupaCoachExpertContext();

  if (page === "CHOOSE_ADVISOR") return <ChooseAdvisorSection />;
  if (page === "CHOOSE_SCHEDULE") return <ChooseScheduleSection />;
  return <ConfirmedSection />;
};
