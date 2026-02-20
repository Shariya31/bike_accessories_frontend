"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/images/Logo.jpg";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { zSchema } from "@/lib/zodSchema";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/application/ButtonLoading";

const LoginPage = () => {
  const formSchema = zSchema.pick({
    email: true,
    password: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleLoginSubmit = async (values) => {
    console.log("Login values:", values);
    // 👉 call login API here
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
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    aria-invalid={fieldState.invalid}
                  />
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
            loading={form.formState.isSubmitting}
          />
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
};

export default LoginPage;