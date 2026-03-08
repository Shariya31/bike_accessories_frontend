"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/public/assets/images/Logo.jpg";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { zSchema } from "@/lib/zodSchema";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/application/ButtonLoading";
import { z } from 'zod'
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from "@/routes/WebsiteRoutes";
import axios from 'axios'
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/application/OTPVerification";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPannelRoute";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false)
  const [isTypePassword, setIsTypePassword] = useState(true)
  const [otpEmail, setOtpEmail] = useState()

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const formSchema = zSchema.pick({
    email: true,
  }).extend({
    password: z.string().min(1, 'Password is required')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(`${baseUrl}/api/v1/auth/login`, values)
      console.log(loginResponse)
      if (!loginResponse.success) {
        throw new Error(loginResponse.data.message)
      }
      setOtpEmail(values.email)
      form.reset();
      showToast('success', loginResponse.message)
    } catch (error) {
      console.log(error)
      showToast('error', error.message)
    } finally {
      setLoading(false)
    }
  };

  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpVerificationResponse } = await axios.post(`${baseUrl}/api/v1/auth/verify-otp`, values)
      console.log(otpVerificationResponse)
      if (!otpVerificationResponse.success) {
        throw new Error(otpVerificationResponse.data.message)
      }
      setOtpEmail('')
      showToast('success', otpVerificationResponse.message)

      dispatch(login(otpVerificationResponse.data))
      if (searchParams.has('callback')) {
        router.push(searchParams.get('callback'))
      }else{
         otpVerificationResponse.data.role === 'admin' ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD)
      }
    } catch (error) {
      console.log(error)
      showToast('error', error.message)
    } finally {
      setOtpVerificationLoading(false)
    }
  }

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
        {!otpEmail ?
          <>
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Login Into Account</h1>
            </div>

            {/* Form */}
            <form
              id="login-form"
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
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        aria-invalid={fieldState.invalid}
                      />
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
                          placeholder="Enter your password"
                          aria-invalid={fieldState.invalid}
                          className="pr-10"
                        />

                        <button
                          type="button"
                          onClick={() => setIsTypePassword(prev => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
              <div className="mb-3">
                <ButtonLoading
                  type="submit"
                  text="Login"
                  loading={form.formState.isSubmitting}
                  className='w-full cursor-pointer'
                />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <p>Don&apos;t have an account ?</p>
                  <Link href={WEBSITE_REGISTER} className="text-primary">Create Account!</Link>
                </div>
                <div className="mt-3">
                  <Link href={WEBSITE_RESETPASSWORD} className="text-primary">Forgot Password ?</Link>
                </div>
              </div>
            </form>
          </>
          :
          <>
            <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading} />
          </>}

      </CardContent>

      <CardFooter />
    </Card>
  );
};

export default LoginPage;