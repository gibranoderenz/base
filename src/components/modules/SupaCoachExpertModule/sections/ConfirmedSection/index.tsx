import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import Image from "next/image";
import {
  useAuthContext,
  useSupaCoachExpertContext,
} from "@/components/contexts";

export const ConfirmedSection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setPage } = useSupaCoachExpertContext();
  const { zaxios } = useAuthContext();

  return (
    <section className="relative flex flex-col items-center justify-center flex-grow">
      <div className="w-full h-[200px] bg-[#FFBE00] text-white relative">
        <button
          onClick={() => {
            setPage("CHOOSE_ADVISOR");
          }}
        >
          <BiChevronLeft size={60} className="pl-4" />
        </button>
        <div className="pl-4 flex items-center gap-2 absolute z-[2]">
          <Image
            src={"https://i.imgur.com/77hSeT6.png"}
            alt="Calendar illustration"
            width={100}
            height={100}
          />
          <h1 className="font-bold text-4xl">Confirmed!</h1>
        </div>
      </div>
      <div className="rounded-full w-[220px] h-[220px] bg-[#FFF082]/50 absolute top-10 -right-20 z-[1]" />

      <div className="p-4 w-full z-[2] h-full flex flex-col gap-6 items-center justify-center bg-[#F7F7F7]"></div>
    </section>
  );
};
