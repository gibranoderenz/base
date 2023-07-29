import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { MdWork } from "react-icons/md";
import Image from "next/image";
import {
  useAuthContext,
  useSupaCoachExpertContext,
} from "@/components/contexts";
import { AdvisorProps } from "../../interface";

export const ChooseAdvisorSection = () => {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [advisors, setAdvisors] = useState<AdvisorProps[]>([]);
  const { zaxios } = useAuthContext();

  const { setSelectedAdvisor, setPage } = useSupaCoachExpertContext();

  const sendPrompt = async () => {
    if (!!prompt) {
      setPrompt(null);
      setIsSearching(true);
      setIsLoading(true);
      try {
        const res = await zaxios({
          url: "/user/matchmaking/",
          method: "POST",
          data: {
            user_prompt: prompt,
          },
        });
        setAdvisors(res.data.top_advisors);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsSearching(false);
    }
  };

  const onSelectAdvisor = (advisor: AdvisorProps) => {
    setSelectedAdvisor(advisor);
    setPage("CHOOSE_SCHEDULE");
  };

  return (
    <section className="relative flex flex-col items-center justify-center flex-grow">
      <div className="w-full h-[200px] bg-[#FFBE00] text-white relative">
        <Link href={"/"}>
          <BiChevronLeft size={60} className="pl-4" />
        </Link>
        <div className="p-8 absolute z-[2]">
          <h1 className="font-bold text-4xl">Search Your Advisor</h1>
          <h3>Tell us your preferences and financial goals</h3>
        </div>
      </div>
      <div className="rounded-full w-[220px] h-[220px] bg-[#FFF082]/50 absolute top-10 -right-20 z-[1]" />

      <div className="p-4 w-full z-[2] h-full flex flex-col gap-6 items-center justify-center bg-[#F7F7F7]">
        <Input
          placeholder="e.g. I want to have low-risk a retirement plan"
          value={prompt as string}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendPrompt();
            }
          }}
        />

        {!isSearching ? (
          <div className="flex flex-col gap-2 items-center justify-center h-full">
            <Image
              src={"https://i.imgur.com/dTDq9VR.png"}
              alt="No query illustration"
              width={200}
              height={200}
              quality={100}
            />

            <div className="flex flex-col gap-1 items-center justify-center text-center">
              <span className="font-bold text-2xl text-[#ABAEAE]">
                No query entered
              </span>
              <span className="text-[#ABAEAE]">
                Kindly write your preference in the search bar above to get your
                advisors.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <span>Finding the right advisors for you...</span>
            ) : (
              advisors?.map((advisor, index) => {
                const {
                  user: { username },
                  current_role,
                  expertise: expertises,
                  full_name,
                  profile_picture,
                  rate_per_hour,
                  years_of_experience,
                } = advisor;
                return (
                  <div
                    className="rounded-xl bg-white p-4 flex flex-col gap-3"
                    key={index}
                  >
                    <div className="flex items-center justify-between gap-6 text-[#455A64]">
                      <div>
                        <Image
                          src={"https://i.imgur.com/wcMxGgv.png"}
                          alt="Advisor profile picture"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{full_name}</span>
                        <span>{current_role}</span>
                        <div className="flex items-center gap-6">
                          <span className="flex items-center gap-1">
                            <MdWork size={20} />
                            {years_of_experience} Yrs Experience
                          </span>
                          <span>IDR {rate_per_hour}/Hr</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {expertises.map(({ name }, index) => {
                        return (
                          <div
                            key={index}
                            className="rounded-full border-[3px] border-[#DEE0E7] px-2 py-1"
                          >
                            <span className="text-[#BFC3CF] font-medium text-sm">
                              {name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Button
                      onClick={() => {
                        onSelectAdvisor(advisor);
                      }}
                      className="w-full bg-light-yellow text-[#8C5F00] hover:bg-light-yellow shadow-none"
                    >
                      Chat with Expert Financial Advisor
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};
