import { useAuthContext } from "@/components/contexts";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";

export const SupaCoachAIModule = () => {
  const { zaxios } = useAuthContext();
  const router = useRouter();
  const [prompt, setPrompt] = useState<string | null>(null);
  const [promptMessage, setPromptMessage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const sendPrompt = async () => {
    try {
      setPromptMessage(prompt);
      setResult(null);
      const res = await zaxios({
        method: "POST",
        url: "/user/talk/",
        data: {
          user_prompt: prompt,
        },
      });
      setResult(res.data.message);
    } catch (err) {
    } finally {
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen">
      <div className="w-full h-[200px] bg-[#FFBE00] text-white relative">
        <Link href={"/"}>
          <BiChevronLeft size={60} className="pl-4" />
        </Link>
        <div className="p-8 absolute z-[2]">
          <h1 className="font-bold text-4xl">SupaCoach-AI</h1>
          <h3>Ask us all your financial worries!</h3>
        </div>
      </div>
      <div className="rounded-full w-[220px] h-[220px] bg-[#FFF082]/50 absolute top-10 -right-20 z-[1]" />

      <div className="bg-[#fbfbfb] w-full flex-grow z-[1] flex flex-col gap-4 pt-3">
        <span className="text-[#797C7B] px-2 py-1 bg-[#F7F7F7] rounded-full text-sm self-center">
          SupaCoach-AI does not save chat history
        </span>

        {!!promptMessage ? (
          <div className="w-1/2 bg-light-yellow rounded-tl-3xl rounded-b-3xl px-4 py-2 self-end mr-4">
            <span className="text-sm">{promptMessage}</span>
          </div>
        ) : null}

        {!!result ? (
          <div className="w-3/4 bg-[#F2F7FB] rounded-tr-3xl rounded-b-3xl px-4 py-2 mb-20 self-start ml-4">
            <span className="text-sm">{result}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-4 fixed bottom-0 bg-white p-4 w-full sm:w-[440px]">
          <Input
            placeholder="Write a question you are curious about..."
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendPrompt();
              }
            }}
          />
          <button
            onClick={() => {
              if (!!prompt) {
                sendPrompt();
              }
            }}
          >
            <IoMdSend size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
