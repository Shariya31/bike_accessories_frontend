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
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoutes";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
const UpdatePassword = ({email}) => {
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)

    const router = useRouter();
    
    const formSchema = zSchema.pick({
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
            email: email,
            password: "",
            confirmPassword: ""
        },
        mode: "onSubmit",
    });

    const handleResetPassword = async (values) => {
        try {
            setLoading(true);
            const { data: resetPasswordResponse } = await axios.put(`${baseUrl}/api/v1/auth/reset-password/update-password`, values)
            if (!resetPasswordResponse.success) {
                throw new Error(resetPasswordResponse.message)
            }
            form.reset();
            showToast('success', resetPasswordResponse.message)
            router.push(WEBSITE_LOGIN)
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
            <div>
                
                {/* Title */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Reset Password</h1>
                </div>

                {/* Form */}
                <form
                    id="login-form"
                    onSubmit={form.handleSubmit(handleResetPassword)}
                    className="space-y-4 mt-6"
                >
                    <FieldGroup>
                       
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
                            text="Reset Password"
                            loading={loading}
                            className='w-full cursor-pointer'
                        />
                    </div>
                </form>
            </div>

    );
};

export default UpdatePassword
