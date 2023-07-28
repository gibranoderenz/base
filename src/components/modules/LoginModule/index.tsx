import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/components/schemas/login.schema";

export const LoginModule = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 px-6 py-8 min-h-screen">
      <div className="text-center flex flex-col gap-1 w-full">
        <h1 className="font-bold text-2xl">Welcome back!</h1>
        <h3>Login using your credentials</h3>
      </div>

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-full items-center gap-2">
              <Button
                type="submit"
                className="bg-core-yellow hover:bg-light-yellow text-black w-full"
              >
                Create Account
              </Button>
              <div className="flex items-center gap-2 text-sm">
                <span>Don&apos;t have an account?</span>
                <Link href={"/register"} className="font-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
