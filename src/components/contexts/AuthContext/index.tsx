import React, { createContext, useContext, useState } from "react";
import {
  AuthContextInterface,
  AuthContextProviderProps,
  User,
} from "./interface";
import axios, { AxiosRequestConfig } from "axios";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const zaxios = async (
    config: AxiosRequestConfig,
    isAuthorized: boolean = false
  ) => {
    return await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      ...config,
      ...(isAuthorized && {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    });
  };

  const value = { zaxios, user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
