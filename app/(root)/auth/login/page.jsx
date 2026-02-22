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
import { WEBSITE_REGISTER } from "@/routes/WebsiteRoutes";
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [isTypePassword, setIsTypePassword] = useState(true)
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
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("Login values:", values);
        resolve();
      }, 3000);
    });
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
                <Link href={''} className="text-primary">Forgot Password ?</Link>
              </div>
          </div>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
};

export default LoginPage;