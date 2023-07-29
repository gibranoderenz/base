import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextInterface,
  AuthContextProviderProps,
  User,
} from "./interface";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const register = async (data: any) => {
    try {
      await zaxios({
        method: "POST",
        url: "/user/register/",
        data,
      });
      toast.success("Register successful!");
      router.push("/login");
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
    }
  };

  const login = async (data: any) => {
    try {
      const res = await zaxios({
        method: "POST",
        url: "/user/login/",
        data,
      });

      const res2 = await axios({
        url: "http://34.101.154.14:8175/hackathon/bankAccount/info",
        method: "POST",
        data: { accountNo: res.data.user.account_no },
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      toast.success("Login successful!");
      router.push("/");
      localStorage.setItem("token", res.data.access_token);
      setUser({ ...res.data.user, balance: res2.data.data.balance });
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
    }
  };

  const getUser = async () => {
    try {
      const { data } = await zaxios({ method: "GET", url: "/user/get/" }, true);
      try {
        const res = await axios({
          url: "http://34.101.154.14:8175/hackathon/bankAccount/info",
          method: "POST",
          data: { accountNo: data.account_no },
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        setUser({ ...data, balance: res.data.data.balance });
      } catch (err) {
        router.push("/");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
    }
  };

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      getUser();
    }
  }, []);

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

  const value = { zaxios, user, setUser, register, login, getUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
