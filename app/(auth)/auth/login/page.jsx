"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/assets/images/Logo.jpg";
import { GoogleLogin } from "@react-oauth/google";
import {login as reduxLogin} from '../../../../store/slices/authSlice'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { zSchema } from "@/lib/zodSchema";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/application/ButtonLoading";
import Link from "next/link";
import {
  USER_DASHBOARD,
  WEBSITE_REGISTER,
  WEBSITE_RESETPASSWORD,
} from "@/routes/WebsiteRoutes";

import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPannelRoute";
import {z} from 'zod';
// 🔥 Hooks
import { useLogin } from "@/hooks/auth/useLogin";
import { useVerifyOtp } from "@/hooks/auth/useVerifyOtp";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch()

  const { mutateAsync: login, isPending: loginLoading } = useLogin();
  const { mutateAsync: verifyOtp, isPending: otpLoading } = useVerifyOtp();
  const { mutateAsync: googleLogin, isPending: googleLoginLoading } = useGoogleAuth();

  const formSchema = zSchema.pick({
    email: true,
  }).extend({
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 🔥 LOGIN
  const handleLoginSubmit = async (values) => {
    try {
      const res = await login(values);

      setOtpEmail(values.email);
      form.reset();

      showToast("success", res.data.message);
    } catch (error) {
      showToast("error", error.response?.data?.message);
    }
  };

  // 🔥 VERIFY OTP
  const handleOtpVerification = async (values) => {
    try {
      const res = await verifyOtp(values);

      showToast("success", res.data.message);
      setOtpEmail("");

      const user = res.data.data;

      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        user.role === "admin"
          ? router.push(ADMIN_DASHBOARD)
          : router.push(USER_DASHBOARD);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message);
    }
  };

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const {data: gooleLoginResponse} = await googleLogin({
        credential: credentialResponse.credential,
      });

      showToast("success", gooleLoginResponse.message);

      const user = gooleLoginResponse.data;

      dispatch(reduxLogin(user));

      if (searchParams.has("callback")) {
        router.push(searchParams.get("callback"));
      } else {
        user.role === "admin"
          ? router.push(ADMIN_DASHBOARD)
          : router.push(USER_DASHBOARD);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message);
    }
  };

  return (
    <Card className="w-112.5">
      <CardContent>
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={Logo}
            height={Logo.height}
            width={Logo.width}
            alt="logo"
            className="max-w-37.5"
          />
        </div>

        {!otpEmail ? (
          <>
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">
                Login Into Account
              </h1>
            </div>

            {/* Form */}
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="space-y-4 mt-6"
            >
              <FieldGroup>
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input {...field} type="email" />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          type={isTypePassword ? "password" : "text"}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setIsTypePassword((prev) => !prev)
                          }
                          className="absolute right-3 top-2"
                        >
                          {isTypePassword ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button>
                      </div>

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Submit */}
              <ButtonLoading
                type="submit"
                text="Login"
                loading={loginLoading}
                className="w-full"
              />

              {/* Google */}
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("Login Failed")}
                disabled={googleLoginLoading}
                text="continue_with"
              />

              {/* Links */}
              <div className="text-center">
                <div className="flex justify-center gap-1.5">
                  <p>Don&apos;t have an account?</p>
                  <Link href={WEBSITE_REGISTER} className="text-primary">
                    Create Account!
                  </Link>
                </div>

                <div className="mt-3">
                  <Link href={WEBSITE_RESETPASSWORD} className="text-primary">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </form>
          </>
        ) : (
          <OTPVerification
            email={otpEmail}
            onSubmit={handleOtpVerification}
            loading={otpLoading}
          />
        )}
      </CardContent>

      <CardFooter />
    </Card>
  );
};

export default LoginPage;