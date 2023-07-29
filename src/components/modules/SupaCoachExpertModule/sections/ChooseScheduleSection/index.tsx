import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { BiChevronLeft, BiSolidCopy } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { MdWork } from "react-icons/md";
import Image from "next/image";
import {
  useAuthContext,
  useSupaCoachExpertContext,
} from "@/components/contexts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Appointment } from "./interface";
import { toast } from "react-hot-toast";

export const ChooseScheduleSection = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedAdvisor, setPage } = useSupaCoachExpertContext();
  const { zaxios } = useAuthContext();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [finalAppointment, setFinalAppointment] = useState<Appointment | null>(
    null
  );

  function compareDates(a: { time: string }, b: { time: string }) {
    const dateA = new Date(a.time).getTime();
    const dateB = new Date(b.time).getTime();
    return dateA - dateB;
  }

  const bookAppointment = async () => {
    try {
      setIsLoading(true);
      const { data } = await zaxios({
        method: "POST",
        url: "/user/appointment/",
        data: {
          start_time: selectedTime,
          token: localStorage.getItem("token"),
          advisorAccountNo: selectedAdvisor?.user.account_no,
          customerAccountNo: user?.account_no,
        },
      });
      const {
        appointment: { id, meet_url, start_time, end_time },
      } = data;
      setFinalAppointment({ id, meet_url, start_time, end_time });
      setShowSuccessModal(true);
    } catch (err) {
      toast.error("An error occured. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sortedAvailability = selectedAdvisor?.availability.sort(compareDates);

  function formatDate(timestamp: string) {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);

    return date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + date.getTimezoneOffset() / 60);

    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  if (!!selectedAdvisor) {
    const {
      full_name,
      current_role,
      expertise: expertises,
      profile_picture,
      rate_per_hour,
      years_of_experience,
    } = selectedAdvisor;
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
            <h1 className="font-bold text-4xl">Schedule</h1>
          </div>
        </div>
        <div className="rounded-full w-[220px] h-[220px] bg-[#FFF082]/50 absolute top-10 -right-20 z-[1]" />

        <div className="p-4 w-full z-[2] h-full flex flex-col gap-6 items-center justify-center bg-[#F7F7F7]">
          <h3 className="font-semibold text-lg text-[#455A64] self-start">
            Selected Financial Advisor
          </h3>

          <div className="flex items-center justify-between gap-6 text-[#455A64]">
            <div className="rounded-full w-[50px] h-[50px]">
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
          <div className="flex flex-col gap-2 w-full items-start justify-between">
            <h3 className="font-semibold text-lg text-[#455A64] self-start">
              Choose a date
            </h3>
            <Select
              onValueChange={(e) => {
                setSelectedTime(e);
              }}
              defaultValue={selectedTime ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred date..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortedAvailability?.map((date, index) => {
                    const inputDate = new Date(date.time);
                    const day = inputDate
                      .getUTCDate()
                      .toString()
                      .padStart(2, "0");
                    const month = (inputDate.getUTCMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = inputDate.getUTCFullYear();
                    const hours = inputDate.getUTCHours();
                    const minutes = inputDate
                      .getUTCMinutes()
                      .toString()
                      .padStart(2, "0");
                    const ampm = hours >= 12 ? "PM" : "AM";
                    const formattedHours = (hours % 12 || 12)
                      .toString()
                      .padStart(2, "0");

                    const formattedDate = `${month}/${day}/${year} ${formattedHours}:${minutes} ${ampm}`;

                    return (
                      <SelectItem value={date.time} key={index}>
                        {formattedDate}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              onClick={bookAppointment}
              className="w-full bg-core-yellow text-black hover:bg-light-yellow shadow-none"
              disabled={!selectedTime || isLoading}
            >
              {isLoading ? <CgSpinner /> : "Confirm and Pay"}
            </Button>
            <Button
              onClick={() => setPage("CHOOSE_ADVISOR")}
              className="w-full bg-light-yellow text-[#8C5F00] hover:bg-light-yellow shadow-none"
              disabled={isLoading}
            >
              Back to Advisors
            </Button>
          </div>
        </div>

        <Dialog open={showSuccessModal}>
          <DialogContent className="sm:max-w-[420px] text-[#455A64]">
            <DialogHeader className="flex flex-col gap-2">
              <DialogTitle className="text-center">Confirmed!</DialogTitle>
              <DialogDescription>
                You have successfully booked the appointment. Here are your
                meeting details (by the way, it has already been saved to your
                calendar!):
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3">
              <Image
                src={"https://i.imgur.com/WoeC5f9.png"}
                alt="Google Meet logo"
                width={40}
                height={40}
                quality={100}
              />

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {finalAppointment?.meet_url.replace("https://", "")}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        finalAppointment?.meet_url ?? ""
                      );
                      toast.success("Google Meet link copied!");
                    }}
                  >
                    <BiSolidCopy size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>{formatDate(finalAppointment?.start_time ?? "")}</span>
                  <div className="bg-[#455A64] w-1 h-1 rounded-full" />
                  <span>
                    {formatTime(finalAppointment?.start_time ?? "")} -{" "}
                    {formatTime(finalAppointment?.end_time ?? "")}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Link href={"/"} className="w-full">
                <Button
                  type="button"
                  className="bg-core-yellow hover:bg-light-yellow text-black w-full"
                >
                  Go to Home Page
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  return <></>;
};
