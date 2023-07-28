import { useAuthContext } from "@/components/contexts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsPersonVcardFill } from "react-icons/bs";
import { PiPersonArmsSpreadFill } from "react-icons/pi";
import { GoPersonFill } from "react-icons/go";
import { MdEmail, MdDateRange } from "react-icons/md";

export const HomeModule = () => {
  const { user } = useAuthContext();
  const [expandProfile, setExpandProfile] = useState<boolean>(false);

  if (user) {
    return (
      <section className="text-center min-h-screen flex flex-col items-center justify-center gap-2 py-8 px-4">
        <div className="h-full flex flex-col items-center justify-center">
          <Image
            src={"https://i.imgur.com/wcMxGgv.png"}
            alt="Home illustration"
            width={300}
            height={300}
          />
          <h1 className="font-bold text-3xl">SupaBank</h1>
          <h3>All in one super-banking app</h3>
        </div>

        <div className="flex flex-col items-center gap-2 w-full justify-end">
          <Link href={"/register"} className="w-full">
            <Button className="w-full bg-core-yellow hover:bg-light-yellow text-black">
              Sign Up
            </Button>
          </Link>
          <Link href={"/login"} className="w-full">
            <Button className="w-full bg-light-yellow text-[#8C5F00] hover:bg-light-yellow">
              Login
            </Button>
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="relative flex flex-col items-center justify-center">
      <div className="w-full h-[200px] bg-[#FFBE00] text-white flex items-end">
        <div className="p-8">
          <h1 className="text-lg">Welcome to SupaBank,</h1>
          <h2 className="font-bold text-4xl">Username</h2>
        </div>
      </div>
      <div className="rounded-full w-[220px] h-[220px] bg-[#FFF082]/50 absolute top-10 -right-20" />

      <div className="w-[90%] z-[1] flex flex-col gap-4">
        <div className="bg-white p-8 rounded-xl -mt-5">
          <div className="flex items-start justify-between">
            <span>Available balance</span>
            <div className="flex items-start gap-2 text-[#455A64]">
              <span className="text-lg">IDR</span>
              <span className="text-2xl font-semibold">2,121,123</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl text-[#455A64] pt-4 flex items-center justify-end">
            Wealth Manager
          </h3>

          <div className="flex relative">
            <Image
              src={"https://i.imgur.com/d99RZ5y.png"}
              alt="SupaCoach-AI icon"
              width={120}
              height={120}
              quality={100}
              className="absolute"
            />
            <div className="bg-white p-4 rounded-xl z-[1] w-full ml-[80px] mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[#455A64] font-medium">
                  SupaCoach-<span className="italic">AI</span>
                </span>
                <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                <span>
                  <span className="italic text-[#455a64cc] text-sm">Free</span>
                </span>
              </div>

              <span className="text-[#455A64] text-sm">
                Your first step to personalized finance recommendations, at your
                fingertips
              </span>

              <Link href={"/supacoach-ai"} className="w-full">
                <Button className="w-full bg-light-yellow text-[#8C5F00] hover:bg-light-yellow shadow-none">
                  Chat with AI-Financial Advisor
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex relative">
            <Image
              src={"https://i.imgur.com/b7kUbOQ.png"}
              alt="SupaCoach-Expert icon"
              width={120}
              height={120}
              quality={100}
              className="absolute"
            />
            <div className="bg-white p-4 rounded-xl z-[1] w-full ml-[80px] mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[#455A64] font-medium">
                  SupaCoach-<span className="italic">Expert</span>
                </span>
                <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                <span>
                  <span className="italic text-[#455a64cc] text-sm">
                    Rates differ
                  </span>
                </span>
              </div>

              <span className="text-[#455A64] text-sm">
                Consult with a finance expert to have a tailored wealth
                management solution
              </span>

              <Link href={"/supacoach-expert"} className="w-full">
                <Button className="w-full bg-light-yellow text-[#8C5F00] hover:bg-light-yellow shadow-none">
                  Find Your Personal Finance Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="pb-20">
          <div className="bg-white rounded-xl px-4 py-8 flex flex-col gap-4 items-center justify-center relative">
            <div className="text-center flex flex-col items-center justify-center">
              <h3 className="font-bold text-xl text-[#455A64]">
                Personal Information
              </h3>
              {!expandProfile ? (
                <h4 className="text-sm text-[#455A64]">
                  Expand to view your account information
                </h4>
              ) : null}
            </div>
            <button
              type="button"
              className="w-8 h-8 rounded-xl bg-magma -mt-4 absolute -bottom-4 flex items-center justify-center"
              onClick={() => {
                setExpandProfile(!expandProfile);
              }}
            >
              <BiChevronDown
                size={24}
                className={`text-white ${
                  expandProfile && "rotate-180"
                } transition duration-75 ease-linear`}
              />
            </button>
            {expandProfile ? (
              <>
                <div className="border-t-2 border-gray-300 w-full flex items-center justify-between px-4 pt-4">
                  <span className="text-sm flex items-center gap-2 font-medium">
                    <GoPersonFill size={20} className="text-[#F5A35C]" />{" "}
                    Username
                  </span>
                  <span className="text-sm">Arkan Gaming</span>
                </div>
                <div className="border-t-2 border-gray-300 w-full flex items-center justify-between px-4 pt-4">
                  <span className="text-sm flex items-center gap-2 font-medium">
                    <MdEmail size={20} className="text-[#F5A35C]" />
                    Email
                  </span>
                  <span className="text-sm">Arkan Gaming</span>
                </div>
                <div className="border-t-2 border-gray-300 w-full flex items-center justify-between px-4 pt-4">
                  <span className="text-sm flex items-center gap-2 font-medium">
                    <MdDateRange size={20} className="text-[#F5A35C]" />
                    Birth Date
                  </span>
                  <span className="text-sm">Arkan Gaming</span>
                </div>
                <div className="border-t-2 border-gray-300 w-full flex items-center justify-between px-4 pt-4">
                  <span className="text-sm flex items-center gap-2 font-medium">
                    <BsPersonVcardFill size={20} className="text-[#F5A35C]" />
                    KTP ID
                  </span>
                  <span className="text-sm">Arkan Gaming</span>
                </div>
                <div className="border-t-2 border-gray-300 w-full flex items-center justify-between px-4 pt-4">
                  <span className="text-sm flex items-center gap-2 font-medium">
                    <PiPersonArmsSpreadFill
                      size={20}
                      className="text-[#F5A35C]"
                    />
                    Gender
                  </span>
                  <span className="text-sm">Arkan Gaming</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
