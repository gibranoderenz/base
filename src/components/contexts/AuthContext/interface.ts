import { AxiosRequestConfig } from "axios";
import { ReactNode, SetStateAction } from "react";

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  zaxios: (config: AxiosRequestConfig, isAuthorized?: boolean) => Promise<any>;
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  register: any;
  login: any;
}

export interface User {
  id: number;
  email: string;
  username: string;
  birth_date: string;
  gender: number;
  is_advisor: false;
  ktp_id: string;
  phone_number: string;
  account_no: string;
  balance: number;
}
