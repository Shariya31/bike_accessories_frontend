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
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from "@/routes/WebsiteRoutes";

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)
    const formSchema = zSchema.pick({
        name: true,
        email: true,
        password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password and confirm password must be same",
        path: ['confirmPassword']
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit",
    });

    const handleRegisterSubmit = async (values) => {
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
                    <h1 className="text-2xl font-semibold">Create Account</h1>
                </div>

                {/* Form */}
                <form
                    id="login-form"
                    onSubmit={form.handleSubmit(handleRegisterSubmit)}
                    className="space-y-4 mt-6"
                >
                    <FieldGroup>
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your full name"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

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

                        {/*Confirm Password */}
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Confirm Password</FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={isTypePassword ? "password" : "text"}
                                            placeholder="Confirm your password"
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
                            text="Register"
                            loading={form.formState.isSubmitting}
                            className='w-full cursor-pointer'
                        />
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <p>Already have an account ?</p>
                            <Link href={WEBSITE_LOGIN} className="text-primary">Log in</Link>
                        </div>
                    </div>
                </form>
            </CardContent>

            <CardFooter />
        </Card>
    );
};

export default RegisterPage
