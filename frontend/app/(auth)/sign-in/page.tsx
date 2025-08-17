"use client";

// package
import Link from "next/link";
import Image from "next/image";

// ui
import Text from "@/ui/text";
import Button from "@/ui/button";

// form
import Input from "@/form/input";

// lib
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

// form packages
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useLoginMutation } from "@/redux/api/rest/mutation/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/slices/configUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// 1. Define schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Define types
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [getLogin, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const router = useRouter();
  // 3. Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("Form Values:", data);
      const res = await getLogin(data).unwrap();
      console.log('resss', res)
      if (res?.success) {
        dispatch(setToken(res?.token));
        dispatch(setUser(res?.user))
        Cookies.set("userToken", res?.token, {
          path: "/",
          secure: true,
          sameSite: "lax",
        });
        localStorage.setItem("user", JSON.stringify(res?.user));
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Login failed. Please try again.");

    }

  };

  return (
    <div className="relative bg-[#F3F5F7] lg:min-h-screen">
      <div
        className={cn([
          "grid lg:grid-cols-2",
          "max-w-[1440px]",
          "overflow-hidden",
          "lg:rounded-lg lg:shadow-2xl",
          "lg:max-h-[720px]",
          "lg:absolute lg:inset-0 lg:m-auto",
        ])}
      >
        <div className="relative flex items-center justify-center bg-[#F3F5F7] p-8 pt-20 lg:h-full">
          <Text
            family="poppins"
            size="2xl"
            color="black/900"
            weight={500}
            className="absolute left-0 top-8 w-full text-center"
          >
            Dis Displays
          </Text>

          <Image
            src="/images/bannerImg.png"
            width={2000}
            height={2000}
            alt="auth"
            className="w-full max-w-[420px] lg:h-[430px] lg:w-auto lg:max-w-none"
          />
        </div>

        <div className="flex justify-center bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn([
              "w-full",
              "flex flex-col gap-8 lg:justify-center",
              "px-8 py-10 lg:px-[88px]",
              "sm:max-w-[480px] md:max-w-[520px] lg:max-w-[560px]",
            ])}
          >
            <div className="space-y-6">
              <h1 className="font-poppins text-[40px] font-medium text-[#121212]">
                Sign In
              </h1>
            </div>

            <div className="space-y-8">
              {/* Email */}
              <div className="border-b border-[#E8ECEF] pb-2 focus-within:border-[#141718]">
                <Input
                  intent="secondary"
                  type="email"
                  placeholder="Email address"
                  {...register("email")}
                />
                {errors.email && (
                  <Text size="xs" color="red" className="mt-1">
                    {errors.email.message}
                  </Text>
                )}
              </div>

              {/* Password */}
              <div className="border-b border-[#E8ECEF] pb-2 focus-within:border-[#141718]">
                <Input
                  intent="secondary"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <Text size="xs" color="red" className="mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-md border border-[#6C7275]"></div>
                  <Text color="gray" size="xs" className="md:text-sm">
                    Remember me
                  </Text>
                </div>

                <Text
                  weight={600}
                  size="xs"
                  color="black/800"
                  className="md:text-sm"
                >
                  Forgot password?
                </Text>
              </div>
            </div>

            <button className="w-full py-2 bg-black text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
