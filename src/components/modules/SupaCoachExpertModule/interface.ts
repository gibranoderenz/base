export interface AdvisorProps {
  user: {
    username: string;
    email: string;
    ktp_id: string;
    phone_number: string;
    account_no: string;
    birth_date: string;
    gender: number;
  };
  full_name: string;
  profile_picture: string;
  years_of_experience: number;
  current_role: any;
  current_employer: any;
  rate_per_hour: number;
  expertise: { name: string }[];
  availability: { time: string }[];
}
