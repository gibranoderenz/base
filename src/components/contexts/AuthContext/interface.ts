import { AxiosRequestConfig } from "axios";
import { ReactNode, SetStateAction } from "react";

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextInterface {
  zaxios: (config: AxiosRequestConfig, isAuthorized?: boolean) => Promise<any>;
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

export interface User {}
